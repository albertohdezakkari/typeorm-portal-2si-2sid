// Amplía cada contexto conservando el runtime y las claves del taller 1:N.
(() => {
 const workspace=document.getElementById('workspace');
 const previous=window.montarCuadernoDual;
 const previousNavigation=window.activarNavegacionCuaderno;
 const catalogue=fetch('nm/contextos.json?v=nm-10').then(response=>{if(!response.ok)throw new Error('Catálogo N:M no disponible');return response.json();});
 const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let current=null,sequence=0,scrollFrame=0,lastY=window.scrollY,scrollDirection=0,scrollDistance=0;
 function viewport(direction=0){if(!current?.started||current.relation!=='nm')return;current.frame.contentWindow.postMessage({type:'nm:viewport',binding:current.binding,offset:Math.max(0,-current.frame.getBoundingClientRect().top),height:innerHeight,direction},location.origin);}
 function category(relation){
  if(!current)return;
  current.relation=relation;
  workspace.dataset.relationCategory=relation;
  current.mainNav.hidden=relation==='nm';
  if(current.banner)current.banner.hidden=relation==='nm';
  for(const button of current.categories.querySelectorAll('[data-relation]'))button.setAttribute('aria-pressed',String(button.dataset.relation===relation));
  const caption=current.categories.querySelector('[data-relation-caption]');
  if(caption)caption.textContent='Relación '+(relation==='nm'?'N:M':'1:N');
 }
 function choose(relation){
  if(!current)return;
  if(relation==='nm'){
   if(current.relation!=='nm')current.lastOneTab=document.getElementById('panel-preparation')?.classList.contains('active')?'preparation':current.mainNav.querySelector('[aria-selected="true"]')?.dataset.tab||'bases';
   category('nm');
   current.nmButton.click();
   history.replaceState(null,'','#nm');
   viewport();
  }else{
   category('one');
   const destination=current.mainNav.querySelector(`[data-tab="${current.lastOneTab}"]`)||current.mainNav.querySelector('[data-tab="bases"]');
   destination.click();
   history.replaceState(null,'',destination.dataset.tab==='training'?'#entrenar':'#1n');
  }
 }
 // Los enlaces del taller (por ejemplo «Abrir preparación 1:N») también cambian de categoría.
 window.activarNavegacionCuaderno=button=>{
  if(current&&current.mainNav.contains(button)){
   const fromNm=current.relation==='nm';
   category(button.dataset.tab==='nm'?'nm':'one');
   if(button.dataset.tab!=='nm'){
    current.lastOneTab=button.dataset.tab;
    if(fromNm)history.replaceState(null,'',button.dataset.tab==='training'?'#entrenar':'#1n');
   }
  }
  return previousNavigation?.(button)||false;
 };
 window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{
  scrollFrame=0;
  const y=window.scrollY,delta=y-lastY;lastY=y;
  let direction=0;
  if(Math.abs(delta)>=.5){
   const nextDirection=Math.sign(delta);
   if(nextDirection!==scrollDirection)scrollDistance=0;
   scrollDirection=nextDirection;scrollDistance+=Math.abs(delta);
   if(scrollDistance>=12){direction=scrollDirection;scrollDistance=0;}
  }
  viewport(direction);
 });},{passive:true});
 window.addEventListener('resize',()=>viewport());
 function clean(){
  if(current){current.mainNav.hidden=false;if(current.banner)current.banner.hidden=false;current.categories.remove();}
  delete workspace.dataset.relationCategory;
  current=null;document.querySelector('[data-tab="nm"]')?.remove();document.getElementById('panel-nm')?.remove();
 }
 window.montarCuadernoDual=async(student,context)=>{
  const request=++sequence;clean();
  await previous(student,context);
  if(request!==sequence||workspace.dataset.currentCase!==context.id||!workspace.classList.contains('active'))return;
  const metadata=(await catalogue)[context.id];
  if(!metadata||request!==sequence)return;
  const identity=student.teacherDemo?'ejemplo-docente':student.email.trim().toLowerCase();
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity+'|'+context.id+'|nm'));
  if(request!==sequence)return;
  const key='sv:nm:v1:'+Array.from(new Uint8Array(bytes),x=>x.toString(16).padStart(2,'0')).join('');
  let saved=null;try{saved=JSON.parse(localStorage.getItem(key)||'null');}catch{}
  const binding=crypto.randomUUID();
  const section=document.createElement('section');section.id='panel-nm';section.className='tab-panel';section.style.padding='clamp(8px,1.5vw,18px)';
  section.innerHTML='<h2 style="margin:5px 0 12px">Ampliación N:M · '+escapeHtml(metadata.title)+'</h2><p id="nm-status" role="status" style="font-size:13px;color:#607762">Se conserva tu recorrido 1:N. Esta unidad guarda su propio avance en este navegador.</p><iframe id="nm-frame" title="'+escapeHtml(context.id+' · '+metadata.title+': TypeORM y Serverless')+'" style="width:100%;min-height:800px;border:0;display:block" referrerpolicy="same-origin"></iframe>';
  workspace.append(section);
  const mainNav=workspace.querySelector(':scope > nav.tabs');
  const banner=workspace.querySelector('.mq-pilot-banner');
  const categories=document.createElement('section');categories.className='nm-category-picker';
  categories.innerHTML='<p class="nm-category-heading">¿Qué relación vas a practicar?</p><nav class="nm-category-nav" aria-label="Elegir el recorrido de relaciones"><button type="button" data-relation="one" aria-pressed="true"><span class="nm-category-badge" aria-hidden="true">1:N</span><span><strong>Relación 1:N</strong><small>'+escapeHtml(metadata.baselineTitle)+' · proyecto base y cinco casos</small></span></button><button type="button" data-relation="nm" aria-pressed="false"><span class="nm-category-badge" aria-hidden="true">N:M</span><span><strong>Relación N:M</strong><small>'+escapeHtml(metadata.title)+' · ampliación del proyecto</small></span></button></nav>';
  if(context.id==='CH-22'){
   const content=[...categories.childNodes],details=document.createElement('details');details.className='guided-relation-choice';details.open=true;
   details.innerHTML='<summary><strong data-relation-caption>Relación 1:N</strong><span>Cambiar relación</span></summary>';
   details.append(...content);categories.replaceChildren(details);
  }
  (banner||mainNav).before(categories);
  categories.addEventListener('click',event=>{const button=event.target.closest('[data-relation]');if(button)choose(button.dataset.relation);});
  // Se conserva el punto de entrada interno para los enlaces existentes, fuera del menú visible.
  const button=document.createElement('button');button.type='button';button.dataset.tab='nm';button.hidden=true;button.setAttribute('role','tab');button.setAttribute('aria-selected','false');button.textContent='Ampliación N:M';
  const simulation=mainNav.querySelector('[data-tab="simulacion"]');if(simulation)simulation.before(button);else mainNav.append(button);
  button.addEventListener('click',()=>{if(!current)return;window.activateTab(button);if(!current?.started){current.started=true;current.frame.src=metadata.url+'?v=nm-continuar-proyecto-1';}});
  const frame=section.querySelector('iframe');current={key,binding,caseId:context.id,frame,state:saved,started:false,relation:'one',lastOneTab:mainNav.querySelector('[aria-selected="true"]')?.dataset.tab||'bases',mainNav,banner,categories,nmButton:button};
  category('one');
  if(context.id!=='CH-22'&&location.hash==='#nm')choose('nm');
 };
 window.addEventListener('message',event=>{
  if(!current||event.origin!==location.origin||event.source!==current.frame.contentWindow)return;
  const data=event.data;
  if(data?.type==='nm:ready'){current.frame.contentWindow.postMessage({type:'nm:init',binding:current.binding,state:current.state},location.origin);return;}
  if(data?.binding!==current.binding)return;
  if(data.type==='nm:height'&&Number.isFinite(data.height)){current.frame.style.height=Math.max(800,Math.min(28000,data.height+8))+'px';viewport();}
  if(data.type==='nm:progress'&&data.state?.version===1&&data.state.caseId===current.caseId&&data.state.unit==='nm'){
   try{const json=JSON.stringify(data.state);if(json.length<180000){localStorage.setItem(current.key,json);current.state=data.state;document.getElementById('nm-status').textContent='Avance N:M guardado en este navegador. Tu progreso 1:N se conserva por separado.';}}catch{}
  }
  if(data.type==='nm:baseline'){
   if(current.caseId==='CH-22'){choose('one');current.mainNav.querySelector('[data-tab="training"]').click();}
   else window.abrirPreparacionGuiada?.(data.track);
  }
  if(data.type==='nm:error')document.getElementById('nm-status').textContent='No se ha podido abrir la ampliación. Recarga la página y elige tu correo.';
 });
 document.getElementById('back').addEventListener('click',()=>{++sequence;clean();});
})();
