// Amplía únicamente CH-22. No modifica el runtime ni las claves del taller 1:N.
(() => {
 const workspace=document.getElementById('workspace');
 const previous=window.montarCuadernoDual;
 let current=null,sequence=0,scrollFrame=0,lastY=window.scrollY;
 function viewport(direction=0){if(!current?.started)return;current.frame.contentWindow.postMessage({type:'nm:viewport',binding:current.binding,offset:Math.max(0,-current.frame.getBoundingClientRect().top),height:innerHeight,direction},location.origin);}
 window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;const y=window.scrollY,delta=y-lastY;lastY=y;if(Math.abs(delta)>10)viewport(delta>0?1:-1);});},{passive:true});
 window.addEventListener('resize',()=>viewport());
 function clean(){current=null;document.querySelector('[data-tab="nm"]')?.remove();document.getElementById('panel-nm')?.remove();}
 window.montarCuadernoDual=async(student,context)=>{
  const request=++sequence;clean();
  await previous(student,context);
  if(request!==sequence||context.id!=='CH-22'||workspace.dataset.currentCase!=='CH-22'||!workspace.classList.contains('active'))return;
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(student.email.trim().toLowerCase()+'|CH-22|nm'));
  if(request!==sequence)return;
  const key='sv:nm:v1:'+Array.from(new Uint8Array(bytes),x=>x.toString(16).padStart(2,'0')).join('');
  let saved=null;try{saved=JSON.parse(localStorage.getItem(key)||'null');}catch{}
  const binding=crypto.randomUUID();
  const section=document.createElement('section');section.id='panel-nm';section.className='tab-panel';section.style.padding='clamp(8px,1.5vw,18px)';
  section.innerHTML='<h2 style="margin:5px 0 12px">Ampliación N:M · Obras y profesionales</h2><p id="nm-status" role="status" style="font-size:13px;color:#607762">Se conserva tu recorrido 1:N. Esta unidad guarda su propio avance en este navegador.</p><iframe id="nm-frame" title="Arturo: ampliación N:M con TypeORM y Serverless" style="width:100%;min-height:800px;border:0;display:block" referrerpolicy="same-origin"></iframe>';
  workspace.append(section);
  const button=document.createElement('button');button.type='button';button.dataset.tab='nm';button.setAttribute('role','tab');button.setAttribute('aria-selected','false');button.textContent='7 · Ampliación N:M';
  const simulation=workspace.querySelector(':scope > nav [data-tab="simulacion"]');simulation.textContent='8 · Simulación y entregas';simulation.before(button);
  button.addEventListener('click',()=>{if(!current)return;window.activateTab(button);if(!current?.started){current.started=true;current.frame.src='nm/?v=nm-1';}});
  const frame=section.querySelector('iframe');current={key,binding,frame,state:saved,started:false};
  if(location.hash==='#nm')button.click();
 };
 window.addEventListener('message',event=>{
  if(!current||event.origin!==location.origin||event.source!==current.frame.contentWindow)return;
  const data=event.data;
  if(data?.type==='nm:ready'){current.frame.contentWindow.postMessage({type:'nm:init',binding:current.binding,state:current.state},location.origin);return;}
  if(data?.binding!==current.binding)return;
  if(data.type==='nm:height'&&Number.isFinite(data.height)){current.frame.style.height=Math.max(800,Math.min(28000,data.height+8))+'px';viewport();}
  if(data.type==='nm:progress'&&data.state?.version===1&&data.state.caseId==='CH-22'&&data.state.unit==='nm'){
   try{const json=JSON.stringify(data.state);if(json.length<180000){localStorage.setItem(current.key,json);current.state=data.state;document.getElementById('nm-status').textContent='Avance N:M guardado en este navegador. Tu progreso 1:N se conserva por separado.';}}catch{}
  }
  if(data.type==='nm:baseline')window.abrirPreparacionGuiada?.(data.track);
  if(data.type==='nm:error')document.getElementById('nm-status').textContent='No se ha podido abrir la ampliación. Recarga la página y elige tu correo.';
 });
 document.getElementById('back').addEventListener('click',()=>{++sequence;clean();});
})();
