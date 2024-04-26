import{d as S,bd as m,aq as x,e,z as L,k as O,M as q,B as v,f as u,i as I,R as d,H as R,A,C as U,b as V,a3 as F,n as W,V as f,q as N,bu as _,bx as j,by as D,aW as k,h as M,bq as B,v as P,cw as w}from"./index-IRfrO0r8.js";import{c as G}from"./cloneDeep-BjXKsRMd.js";import{N as C,a as E}from"./ListItem-DpW4FLgh.js";import"./_baseClone-D1XfUU-M.js";const p={TO_VISITOR:1,TO_ADMIN:2,TO_SYSTEM:4,ALL:7};function y(s){return typeof s=="function"||Object.prototype.toString.call(s)==="[object Object]"&&!P(s)}const H="webhook.list",X=S({setup(){const{data:s,mutate:c}=m(H,async()=>d.api.webhooks.get()),i=x(),a=o=>{i.create({title:"Create Webhook",content:()=>e(J,{formData:o,onSubmit:()=>{c()}},null),class:"!w-[800px] !max-w-[80vw]"})},l=o=>{i.create({title:"Webhook Dispatches",content:()=>e(z,{hookId:o},null),class:"!w-[600px] !max-w-[80vw]"})};return()=>e(U,{actionsElement:e(R,{name:"Add Webhook",icon:e(A,null,null),onClick:()=>a()},null)},{default:()=>[e(C,{hoverable:!0,clickable:!0},{default:()=>[s.value?.data.map(o=>e("div",{role:"button",tabindex:0,onClick:()=>{l(o.id)}},[e(E,{key:o.id},{default(){return e(L,{title:o.payloadUrl},{description(){return e("div",{class:"space-x-2"},[o.events.map(n=>e(O,{size:"small",type:"success",round:!0},y(n)?n:{default:()=>[n]}))])},avatar(){return e("div",{class:["h-2 w-2 rounded-full",o.enabled?"bg-green-500":"bg-gray-500"]},null)}})},suffix(){return e("div",{onClick:n=>n.stopPropagation()},[e(q,null,{default:()=>[e(v,{round:!0,onClick:()=>{a(o)}},{default:()=>[u("编辑")]}),e(I,{positiveText:"取消",negativeText:"删除",onNegativeClick:async()=>{await d.api.webhooks(o.id).delete(),c()}},{trigger:()=>e(v,{round:!0,type:"error",ghost:!0},{default:()=>[u("移除")]}),default:()=>e("span",{class:"max-w-48"},[u("确定要删除 ?")])})]})])}})]))]})]})}}),J=S({props:{formData:{type:Object,required:!1},onSubmit:{type:Function,required:!1}},setup(s){const{data:c}=m("webhook.events",async()=>d.api.webhooks.events.get()),i=s.formData!==void 0,a=V(G(s.formData)??{events:[],enabled:!0,scope:p.TO_SYSTEM}),{destroyAll:l}=x(),o=F(()=>new Set(a.value.events)),n=async()=>{if(!i)await d.api.webhooks.post({data:{...a.value}});else{const r={...a.value};r.secret||Reflect.deleteProperty(r,"secret"),await d.api.webhooks(s.formData.id).patch({data:r})}l(),s.onSubmit?.()};return()=>{let r;return e("div",{class:"mt-5"},[e(W,null,{default:()=>[e(f,{required:!0,label:"Payload URL"},{default:()=>[e(N,{value:a.value.payloadUrl,onUpdateValue:t=>{a.value.payloadUrl=t}},null)]}),e(f,{required:!0,label:"Secret"},{default:()=>[e(N,{value:a.value.secret,type:"password",showPasswordOn:"click",onUpdateValue:t=>{a.value.secret=t}},null)]}),e(f,{required:!0,label:"Events"},{default:()=>[e(_,{nativeScrollbar:!1,embedded:!0,class:"!h-[400px] !bg-transparent"},{default:()=>[e(j,{cols:2,xGap:12,yGap:12},{default:()=>[e(D,null,{default:()=>[e(k,{checked:o.value.has("all"),onUpdateChecked:t=>{t?a.value.events=["all"]:a.value.events=[]}},{default:()=>[u("ALL")]})]}),c.value?.data.map(t=>e(D,null,{default:()=>[e(k,{checked:o.value.has(t)||o.value.has("all"),onUpdateChecked:h=>{h?a.value.events.push(t):a.value.events=a.value.events.filter(b=>b!==t)}},y(t)?t:{default:()=>[t]})]}))]})]})]}),e(f,{required:!0,label:"Scope"},{default:()=>[e(M,{wrap:!0},y(r=Object.keys(p).map(t=>{const h=p[t],b=a.value.scope;return e(k,{checked:(b&h)===h||b===p.ALL,onUpdateChecked:T=>{T?a.value.scope|=p[t]:a.value.scope&=~p[t]}},y(t)?t:{default:()=>[t]})}))?r:{default:()=>[r]})]}),e(f,{required:!0,label:"Enabled"},{default:()=>[e(B,{onUpdateValue:t=>{a.value.enabled=t},value:a.value.enabled},null)]}),e("div",{class:"flex justify-end"},[e(v,{onClick:n,type:"primary",round:!0},{default:()=>[u("提交")]})])]})])}}}),z=S({props:{hookId:{type:String,required:!0}},setup(s){const{data:c}=m(`webhook.events${s.hookId}`,async()=>await d.api.webhooks(s.hookId).get({params:{page:1,size:20}}).then(l=>l.data)),i=x(),a=l=>{i.create({title:"Webhook Dispatch Detail",class:"!w-[800px] !max-w-[80vw]",content:()=>e("div",{class:"max-h-[80vh] overflow-auto"},[e("div",{class:"flex flex-col gap-4"},[e(v,{class:"absolute right-4 top-4",type:"primary",onClick:()=>{d.api.webhooks.redispatch(l.id).post().then(()=>{message.success("Re-Dispatch Success")}).catch(()=>{message.error("Re-Dispatch Failed")})}},{default:()=>[u("Re-Dispatch")]}),e("p",null,[u("Status: "),l.status,u(" "),l.success?"✅":"❌"]),e("p",null,[u("Header:")]),e(w,{code:g(l.headers),class:"p-4"},null),e("p",null,[u("Payload:")]),e(w,{code:g(l.payload),class:"p-4"},null),e("p",null,[u("Response:")]),e(w,{code:g(l.response),class:"p-4"},null)])])})};return()=>e("div",null,[e(C,null,{default:()=>[c.value?.map(l=>e(E,{key:l.id},{default:()=>[e("div",{class:"flex items-center space-x-4"},[e("div",{class:["h-2 w-2 rounded-full",l.success?"bg-green-500":"bg-red-500"]},null),e("div",{class:"w-[30px]"},[l.status]),e("span",{style:{flex:2}},[new Date(l.timestamp).toLocaleString()]),e("span",{style:{flex:2}},[l.event]),e(v,{onClick:()=>a(l),quaternary:!0,type:"primary",class:"justify-self-end",style:{flex:1}},{default:()=>[u("Detail")]})])]}))]})])}}),g=s=>JSON.stringify(JSON.parse(s),null,2);export{J as EditWebhookForm,X as default};
