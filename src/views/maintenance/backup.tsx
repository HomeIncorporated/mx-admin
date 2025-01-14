import { HeaderActionButton } from 'components/button/rounded-button'
import {
  DatabaseBackupIcon,
  TrashSharpIcon,
  UploadIcon,
} from 'components/icons'
import { DeleteConfirmButton } from 'components/special-button/delete-confirm'
import { Table } from 'components/table'
import { useDataTableFetch } from 'hooks/use-table'
import { ContentLayout } from 'layouts/content'
import { NButton, NPopconfirm, NSpace } from 'naive-ui'
import { responseBlobToFile, RESTManager } from 'utils'
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent(() => {
  const { checkedRowKeys, data, fetchDataFn, loading } = useDataTableFetch<{
    filename: string
    size: string
  }>((data) => async () => {
    const response = (await RESTManager.api.backups.get()) as any
    // sort by filename
    const data$ = response.data as { filename: string; size: string }[]
    data$.sort((b, a) => a.filename.localeCompare(b.filename))

    data.value = data$ as any
  })
  onBeforeMount(() => {
    fetchDataFn()
  })

  const handleBackup = async () => {
    const info = message.info('备份中', { duration: 10e8, closable: true })

    const blob = await RESTManager.api.backups.new.get({
      responseType: 'blob',
      timeout: 10e8,
    })
    info.destroy()
    message.success('备份完成')
    responseBlobToFile(blob, 'backup.zip')
  }
  const handleUploadAndRestore = async () => {
    const $file = document.createElement('input')
    $file.type = 'file'
    $file.style.cssText = `position: absolute; opacity: 0; z-index: -9999;top: 0; left: 0`
    $file.accept = '.zip'
    document.body.append($file)
    $file.click()
    $file.onchange = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const file = $file.files![0]
      const formData = new FormData()
      formData.append('file', file)
      RESTManager.api.backups.rollback
        .post({
          data: formData,
          timeout: 1 << 30,
        })
        .then(() => {
          message.success('恢复成功，页面将会重载')
          setTimeout(() => {
            location.reload()
          }, 1000)
        })
    }
  }
  const handleDelete = async (filename: string | string[]) => {
    let files = ''
    if (Array.isArray(filename)) {
      files = filename.join(',')
    } else {
      files = filename
    }
    await RESTManager.api.backups.delete({
      data: {
        files,
      },
    })

    message.success('删除成功')
    if (Array.isArray(filename)) {
      filename.forEach((filename) => {
        const index = data.value.findIndex((i) => i.filename === filename)
        if (index != -1) {
          data.value.splice(index, 1)
        }
      })
    } else {
      const index = data.value.findIndex((i) => i.filename === filename)
      if (index != -1) {
        data.value.splice(index, 1)
      }
    }
  }
  const handleRollback = async (filename: string) => {
    await RESTManager.api.backups.rollback(filename).patch({})
    message.info('回滚中', { closable: true, duration: 10e8 })
  }

  const handleDownload = async (filename: string) => {
    const info = message.info('下载中', { duration: 10e8, closable: true })
    const blob = await RESTManager.api.backups(filename).get({
      responseType: 'blob',
      timeout: 10e8,
    })
    info.destroy()
    message.success('下载完成')

    responseBlobToFile(blob, `${filename}.zip`)
  }

  return () => (
    <ContentLayout
      actionsElement={
        <>
          <HeaderActionButton
            icon={<DatabaseBackupIcon />}
            name="立即备份"
            variant="primary"
            onClick={handleBackup}
          ></HeaderActionButton>
          <HeaderActionButton
            icon={<UploadIcon />}
            onClick={handleUploadAndRestore}
            name="上传恢复"
            variant="info"
          ></HeaderActionButton>
          <DeleteConfirmButton
            checkedRowKeys={checkedRowKeys.value}
            onDelete={async () => {
              handleDelete(checkedRowKeys.value)
            }}
            customIcon={<TrashSharpIcon />}
            customButtonTip="批量删除"
          />
        </>
      }
    >
      <Table
        {...{ data, fetchDataFn }}
        checkedRowKey="filename"
        loading={loading.value}
        nTableProps={{
          maxHeight: 'calc(100vh - 17rem)',
        }}
        onUpdateCheckedRowKeys={(keys) => {
          checkedRowKeys.value = keys
        }}
        maxWidth={500}
        columns={[
          {
            type: 'selection',
            options: ['none', 'all'],
          },

          { title: '日期', key: 'filename', width: 300 },
          { title: '大小', key: 'size', width: 200 },
          {
            title: '操作',
            fixed: 'right',
            width: 200,
            key: 'filename',
            render(row) {
              const filename = row.filename
              return (
                <NSpace inline>
                  <NButton
                    quaternary
                    size="tiny"
                    type="primary"
                    onClick={() => void handleDownload(filename)}
                  >
                    下载
                  </NButton>

                  <NPopconfirm
                    positiveText={'取消'}
                    negativeText="回退"
                    onNegativeClick={() => {
                      handleRollback(filename)
                    }}
                  >
                    {{
                      trigger: () => (
                        <NButton quaternary size="tiny" type="warning">
                          回退
                        </NButton>
                      ),

                      default: () => <span class="max-w-48">确定要回退？</span>,
                    }}
                  </NPopconfirm>

                  <NPopconfirm
                    positiveText={'取消'}
                    negativeText="删除"
                    onNegativeClick={() => {
                      handleDelete(filename)
                    }}
                  >
                    {{
                      trigger: () => (
                        <NButton quaternary size="tiny" type="error">
                          移除
                        </NButton>
                      ),

                      default: () => <span class="max-w-48">确定要删除？</span>,
                    }}
                  </NPopconfirm>
                </NSpace>
              )
            },
          },
        ]}
        noPagination
      ></Table>
    </ContentLayout>
  )
})
