import{d as E,b as v,b3 as Y,e,D,v as Z,V as y,Q as j,q as B,B as h,f as r,n as L,am as G,Y as J,y as K,Z as W,c as X,w as O,as as ee,aq as ae,aj as te,ag as ue,ak as x,j as A,a2 as N,al as le,a1 as ne,h as P,F as R,R as m,i as se,s as re,m as ie,H as M,A as oe,b4 as de,C as ce,ai as ve}from"./index-IRfrO0r8.js";import{o as pe}from"./omit-CUW5pwst.js";import{L as i,a as S}from"./index-XBffZLXW.js";import"./_baseClone-D1XfUU-M.js";import"./last-DXTTfs9a.js";const U={Audit:"待审核",Pass:"通过",Outdate:"过时",Banned:"屏蔽",Reject:"拒绝"},_="https://fastly.jsdelivr.net/gh/mx-space/mx-admin@gh-pages/assets/fallback-BjFffESB.jpg";function z(u){return typeof u=="function"||Object.prototype.toString.call(u)==="[object Object]"&&!Z(u)}const $=E(u=>{const p=v(),c=v(!1),s=Y(p,o=>{o[0].isIntersecting&&(c.value=!0,s.stop())});return()=>{let o,n;return e("div",{ref:p},[u.avatar?c.value?e(D,{src:u.avatar,round:!0,onError:C=>{console.log(_),C.target.src=_}},null):e(D,{round:!0},z(o=u.name.charAt(0))?o:{default:()=>[o]}):e(D,{round:!0},z(n=u.name.charAt(0))?n:{default:()=>[n]})])}});$.props=["avatar","name"];const fe=E({props:{onCallback:{type:Function,required:!0}},setup(u){const p=v(""),c=v(i.Pass),s=Object.entries(U).filter(([n])=>n!=="Audit").map(([n,C])=>({value:i[n],key:n,label:C})),o=()=>{u.onCallback(c.value,p.value)};return()=>e(L,{class:"mt-6"},{default:()=>[e(y,{label:"状态"},{default:()=>[e(j,{value:c.value,onUpdateValue:n=>c.value=n,options:s},null)]}),e(y,{label:"原因"},{default:()=>[e(B,{type:"textarea",value:p.value,onUpdateValue:n=>p.value=n,placeholder:"请输入原因",maxlength:200,autosize:{maxRows:4,minRows:2}},null)]}),e("div",{class:"flex justify-end"},[e(h,{round:!0,type:"primary",onClick:o},{default:()=>[r("发送")]})])]})}}),me=E({props:{url:String,errorMessage:String,status:[String,Number]},setup(u){return()=>e("div",{class:"flex items-center space-x-2"},[e("a",{target:"_blank",href:u.url,rel:"noreferrer"},[u.url]),typeof u.status<"u"&&(u.errorMessage?e(G,null,{trigger(){return e("div",{class:"h-2 w-2 rounded-full bg-red-400"},null)},default(){return u.errorMessage}}):e("div",{class:"h-2 w-2 rounded-full bg-green-300"},null))])}}),Ce=E({setup(){const u=J(),p=K(),c=v(u.query.state??i.Pass),{data:s,fetchDataFn:o,pager:n,loading:C}=W((a,l)=>async(d=u.query.page||1,g=50)=>{const F=u.query.state??i.Pass,V=await m.api.links.get({params:{page:d,size:g,state:F|0}});a.value=V.data,l.value=V.pagination}),b=X(),w=()=>({avatar:"",name:"",type:S.Friend,url:"",id:null,description:"",state:i.Pass}),k=v(!1),t=v(w());O(()=>u.query.state,async a=>{await o()}),O(()=>u.query.page,async a=>{await o()},{immediate:!0});const f=v({}),q=async()=>{const a=await m.api.links.state.get();f.value=a};ee(()=>{q()});const H=async()=>{const a=t.value.id;if(a){const l=await m.api.links(a).put({data:pe(t.value,["id","created","hide"])}),d=s.value.findIndex(g=>g.id==a);l.state!=c.value?(s.value.splice(d,1),q()):s.value[d]={...s.value[d],...ve(t.value)}}else{const{data:l}=await m.api.links.post({data:{...t.value}});s.value.unshift(l)}b.success("操作成功"),k.value=!1,t.value=w()},I=v(),Q=async()=>{const a=b.loading("检查中",{duration:2e5});try{const l=await m.api.links.health.get({timeout:2e5});I.value=Object.entries(l).reduce((d,[g,F])=>({...d,[g.toLowerCase()]:F}),{}),b.success("检查完成")}catch(l){console.error(l)}finally{requestAnimationFrame(()=>{a.destroy()})}},T=ae();return()=>e(ce,{actionsElement:e(R,null,[e(M,{icon:e(oe,null,null),variant:"primary",onClick:()=>{t.value=w(),k.value=!0}},null),e(M,{icon:e(de,null,null),variant:"info",onClick:Q,name:"检查友链可用性"},null)])},{default:()=>[e(te,{class:"min-h-[30px]",size:"medium",value:c.value,onUpdateValue:a=>{c.value=a,p.replace({name:ue.Friend,query:{state:a}})}},{default:()=>[e(x,{name:i.Pass,tab:"朋友们"},null),e(x,{name:i.Audit,tab:()=>e(A,{value:f.value.audit,processing:!0},{default:()=>[e(N,null,{default:()=>[r("待审核")]})]})},null),e(x,{name:i.Outdate,tab:()=>e(A,{value:f.value.outdate,type:"info"},{default:()=>[e(N,null,{default:()=>[r("过时的")]})]})},null),e(x,{name:i.Reject,tab:()=>e(A,{value:f.value.reject,type:"warning"},{default:()=>[e(N,null,{default:()=>[r("已拒绝")]})]})},null),e(x,{name:i.Banned,tab:()=>e(A,{value:f.value.banned,type:"error"},{default:()=>[e(N,null,{default:()=>[r("封禁的")]})]})},null)]}),e(le,{loading:C.value,data:s,nTableProps:{maxHeight:"calc(100vh - 22rem)"},columns:[{title:"头像",key:"avatar",width:80,render(a){return e($,{name:a.name,avatar:a.avatar},null)}},{title:"名称",key:"name",render(a){return e("a",{target:"_blank",href:a.url,rel:"noreferrer"},[a.name])}},{title:"描述",key:"description",width:250,ellipsis:{lineClamp:2,tooltip:!0}},{title:"网址",key:"url",render(a){const l=I.value?.[a.id];return e(me,{url:a.url,errorMessage:l?.message,status:l?.status},null)}},{title:"类型",key:"type",width:80,render(a){return["朋友","收藏"][a.type|0]}},{title:"对方邮箱",key:"email",render(a){return e("a",{href:`mailto:${a.email}`},[a.email])}},{title:"结识时间",key:"created",width:80,render(a){return e(ne,{time:a.created},null)}},{width:150,title:"操作",fixed:"right",key:"action",render(a){return e(P,{wrap:!1},{default:()=>[a.state==i.Audit&&e(R,null,[e(h,{quaternary:!0,size:"tiny",type:"success",onClick:async()=>{await m.api.links.audit(a.id).patch(),b.success(`通过了来自${a.name}的友链邀请`);const l=s.value.findIndex(d=>d.id==a.id);s.value.splice(l,1),f.value.audit--}},{default:()=>[r("通过")]}),e(h,{quaternary:!0,size:"tiny",type:"info",onClick:async()=>{T.create({title:"发送友链结果",closeOnEsc:!0,closable:!0,content:()=>e(fe,{onCallback:async(l,d)=>{await m.api.links.audit.reason(a.id).post({data:{state:l,reason:d}}),b.success(`已发送友链结果给「${a.name}」`);const g=s.value.findIndex(F=>F.id==a.id);s.value.splice(g,1),f.value.audit--,T.destroyAll()}},null)})}},{default:()=>[r("理由")]})]),e(h,{quaternary:!0,size:"tiny",type:"info",onClick:l=>{k.value=!0,t.value={...a}}},{default:()=>[r("编辑")]}),e(se,{positiveText:"取消",negativeText:"删除",onNegativeClick:async()=>{await m.api.links(a.id).delete(),b.success("删除成功"),await o(n.value.currentPage),a.state==i.Audit&&f.value.audit--}},{trigger:()=>e(h,{text:!0,type:"error",size:"tiny"},{default:()=>[r("移除")]}),default:()=>e("span",{class:"max-w-48"},[r("确定要删除友链 "),a.name,r(" ?")])})]})}}],onFetchData:o,pager:n},null),e(re,{transformOrigin:"center",show:k.value,onUpdateShow:a=>void(k.value=a)},{default:()=>[e(ie,{style:"width: 500px;max-width: 90vw",headerStyle:{textAlign:"center"},title:t.value.id?`编辑: ${t.value.name}`:"新增"},{default:()=>[e(L,null,{default:()=>[e(y,{label:"名字",required:!0},{default:()=>[e(B,{autofocus:!0,value:t.value.name,onInput:a=>void(t.value.name=a)},null)]}),e(y,{label:"头像"},{default:()=>[e(B,{autofocus:!0,value:t.value.avatar,onInput:a=>void(t.value.avatar=a)},null)]}),e(y,{label:"网址",required:!0},{default:()=>[e(B,{autofocus:!0,value:t.value.url,onInput:a=>void(t.value.url=a)},null)]}),e(y,{label:"描述"},{default:()=>[e(B,{autofocus:!0,value:t.value.description,onInput:a=>void(t.value.description=a)},null)]}),e(y,{label:"类型"},{default:()=>[e(j,{placeholder:"选择类型",options:[{label:"朋友",value:S.Friend},{label:"收藏",value:S.Collection}],value:t.value.type,onUpdateValue:a=>void(t.value.type=a|0)},null)]}),t.value.id&&e(y,{label:"状态"},{default:()=>[e(j,{placeholder:"选择状态",options:Object.entries(U).map(([a,l])=>({label:l,value:i[a]})),value:t.value.state,onUpdateValue:a=>void(t.value.state=a|0)},null)]})]}),e("div",{class:"text-right"},[e(P,{size:12,align:"center",inline:!0},{default:()=>[e(h,{type:"success",onClick:H,round:!0},{default:()=>[r("确定")]}),e(h,{onClick:()=>{k.value=!1,t.value=w()},round:!0},{default:()=>[r("取消")]})]})])]})]})]})}});export{Ce as default};
