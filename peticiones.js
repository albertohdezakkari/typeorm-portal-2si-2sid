// Cada botón prepara una petición normal. El alumno la ejecuta en su terminal.
const sessions=new Map();
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const quote=s=>"'"+String(s).replace(/'/g,"'\\''")+"'";
export function montarPeticiones(host,context,{track='nest',profile=null}={}){
 if(!context)return;
 const p=context.parent,n=context.child,m=context.metric,t=context.text,key=context.id+':'+track+':'+Boolean(profile);
 const state=sessions.get(key)||{action:profile?'profile-create':'parent-create',url:track==='nest'?'http://localhost:3000':'$API_URL',parentName:p.examples[0],childName:context.createName,value:m.create,parentId:'1',childId:'1',profileId:'1',firstName:'Diego',surname:'Ruiz López',email:'diego.ruiz@example.test',role:profile?.role||'Responsable'};
 sessions.set(key,state);
 const actions=[['parent-create','Añadir '+p.entity,['parentName']],['parent-list','Ver '+p.route,[]],['child-create','Añadir '+n.entity,['childName','value','parentId']],['child-list','Ver '+n.route,[]]];
 if(profile)actions.push(['profile-create','Añadir '+profile.entity,['firstName','surname','email']],['profile-list','Ver '+profile.route,[]],['link-create','Crear vínculo',['childId','profileId','role']],['link-child','Vínculos por '+n.entity,['childId']],['link-profile','Vínculos por '+profile.entity,['profileId']],['link-change','Cambiar rol',['childId','profileId','role']],['link-delete','Quitar vínculo',['childId','profileId']]);
 const fields={parentName:['Nombre de '+p.entity,'text'],childName:[cap(t.property)+' de '+n.entity,'text'],value:[m.label,'number'],parentId:['ID real de '+p.entity,'number'],childId:['ID real de '+n.entity,'number'],profileId:['ID real de '+(profile?.entity||'perfil'),'number'],firstName:['Nombre','text'],surname:['Apellidos','text'],email:['Correo del perfil de ejemplo','email'],role:['Rol en el vínculo','text']};
 const current=actions.find(a=>a[0]===state.action)||actions[0];state.action=current[0];
 host.className='api-lab';host.innerHTML=`<header><span>PETICIONES NORMALES A TU API</span><h2>Prueba ambos lados de la relación</h2><p>Primero añade ${esc(p.entity)}. Copia el ID devuelto y úsalo al añadir ${esc(n.entity)}. Cada petición pasa por las capas que has programado.</p></header><nav aria-label="Peticiones de práctica">${actions.map(([id,label])=>`<button type="button" data-api-action="${id}" aria-pressed="${id===state.action}">${esc(label)}</button>`).join('')}</nav><div class="api-fields"><label>URL de tu API<input data-api-field="url" value="${esc(state.url)}" spellcheck="false"></label>${current[2].map(k=>`<label>${esc(fields[k][0])}<input data-api-field="${k}" type="${fields[k][1]}" value="${esc(state[k])}"${fields[k][1]==='number'?' min="0"':''}></label>`).join('')}</div><div class="api-request-heading"><strong data-api-method></strong><button type="button" data-api-copy>Copiar curl</button></div><pre tabindex="0"><code data-api-code></code></pre><p class="api-instruction">Ejecuta el curl en Terminal 2. ${track==='nest'?'Mantén npm run start:dev abierto en Terminal 1.':'Despliega los archivos guardados y utiliza la URL real de tu API.'} Al crear, anota el ID de la respuesta; los IDs que ves aquí son ejemplos y puedes cambiarlos. Esta zona prepara el comando; la respuesta aparece en tu terminal.</p><p data-api-status role="status" aria-live="polite"></p>`;
 function request(){
  let method='GET',route='/'+p.route,body=null;const pid=Number(state.parentId),cid=Number(state.childId),rid=Number(state.profileId);
  switch(state.action){
   case'parent-create':method='POST';body={nombre:state.parentName};break;
   case'child-create':method='POST';route='/'+n.route;body={[t.property]:state.childName,[m.property]:Number(state.value),[p.input]:pid};break;
   case'child-list':route='/'+n.route;break;
   case'profile-create':method='POST';route='/'+profile.route;body={nombre:state.firstName,apellidos:state.surname,email:state.email};break;
   case'profile-list':route='/'+profile.route;break;
   case'link-create':method='POST';route='/'+n.route+'/'+cid+'/asignaciones';body={[profile.input]:rid,rol:state.role};break;
   case'link-child':route='/'+n.route+'/'+cid+'/asignaciones';break;
   case'link-profile':route='/'+profile.route+'/'+rid+'/asignaciones';break;
   case'link-change':method='PATCH';route='/'+n.route+'/'+cid+'/asignaciones/'+rid;body={rol:state.role};break;
   case'link-delete':method='DELETE';route='/'+n.route+'/'+cid+'/asignaciones/'+rid;break;
  }
  const url=state.url.replace(/\/$/,'')+route;let code='curl -i'+(method==='GET'?'':' -X '+method)+' '+(state.url==='$API_URL'?'"'+url+'"':quote(url));
  if(body)code+=" \\\n  -H 'Content-Type: application/json' \\\n  -d "+quote(JSON.stringify(body));
  host.querySelector('[data-api-code]').textContent=code;host.querySelector('[data-api-method]').textContent=method+' '+route;return code;
 }
 host.querySelectorAll('[data-api-action]').forEach(button=>button.onclick=()=>{state.action=button.dataset.apiAction;montarPeticiones(host,context,{track,profile});host.querySelector('[aria-pressed=true]').focus({preventScroll:true});});
 host.querySelectorAll('[data-api-field]').forEach(input=>input.oninput=()=>{state[input.dataset.apiField]=input.value;request();});
 host.querySelector('[data-api-copy]').onclick=async()=>{try{await navigator.clipboard.writeText(request());host.querySelector('[data-api-status]').textContent='Curl copiado. Ejecútalo en tu terminal.';}catch{const range=document.createRange();range.selectNodeContents(host.querySelector('[data-api-code]'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);host.querySelector('[data-api-status]').textContent='Código seleccionado. Puedes copiarlo.';}};
 request();
}
function cap(s){return s[0].toUpperCase()+s.slice(1);}
