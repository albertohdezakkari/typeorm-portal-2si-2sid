const root=document.getElementById('nm-root');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let D,S,binding=null,ready=false,timer=null,selected=null,drag=null,menuCollapsed=false,scrollYBefore=0,scrollDistance=0,scrollDirection=0,scrollFrame=0,keyboardNavigation=false,outerHeight=0,outerOffset=0;
const send=(type,payload={})=>{if(parent!==window&&binding)parent.postMessage({type,binding,...payload},location.origin);};
const stage=()=>D.tracks[S.track][S.positions[S.track]];
const key=()=>S.track+':'+stage().id;
const save=()=>send('nm:progress',{state:S});
const $=q=>root.querySelector(q);
const $$=q=>[...root.querySelectorAll(q)];
const stop=()=>{clearTimeout(timer);timer=null;if(ready&&$('[data-action=play]'))$('[data-action=play]').textContent='Ver animación';};
const hasCode=s=>Boolean(s.code)&&!['logical','mapping'].includes(s.kind);
function resize(){send('nm:height',{height:Math.ceil(document.documentElement.getBoundingClientRect().height)});}
function defaults(saved){
 if(D.nestSimpleRevision&&saved?.nestSimpleRevision!==D.nestSimpleRevision){
  saved=saved?structuredClone(saved):null;
  if(saved){
   const revision=String(saved.nestSimpleRevision||0),retained=D.nestRetainedByRevision?.[revision]||D.nestRetainedIds||['situacion','logico'];
   const keep=k=>!String(k).startsWith('nest:')||retained.includes(String(k).slice(5));
   saved.answers=Object.fromEntries(Object.entries(saved.answers||{}).filter(([k])=>keep(k)));
   saved.solved=(saved.solved||[]).filter(keep);saved.checked=(saved.checked||[]).filter(keep);
   const oldId=(D.nestPreviousIds?.[revision]||D.legacyNestIds)?.[saved.positions?.nest],target=D.nestStepAliases?.[oldId]||oldId?.replace(/-repository$/,'-service');
   const mapped=D.tracks.nest.findIndex(s=>s.id===target);
   if(saved.positions)saved.positions.nest=Math.max(0,mapped);
   if(saved.track==='nest'){saved.cue=0;saved.mode='observe';saved.full=false;}
  }
 }

 if(D.ormDataRevision&&saved&&saved.ormDataRevision!==D.ormDataRevision){
  saved=structuredClone(saved);
  const changed=k=>String(k).startsWith('nest:')&&(D.ormDataRevisedIds||[]).includes(String(k).slice(5));
  saved.answers=Object.fromEntries(Object.entries(saved.answers||{}).filter(([k])=>!changed(k)));
  saved.solved=(saved.solved||[]).filter(k=>!changed(k));saved.checked=(saved.checked||[]).filter(k=>!changed(k));
  if(saved.track==='nest'&&changed('nest:'+D.tracks.nest[saved.positions?.nest]?.id)){saved.cue=0;saved.mode='observe';saved.full=false;}
 }

 const s={version:1,unit:'nm',caseId:'CH-07',...(D.ormDataRevision?{ormDataRevision:D.ormDataRevision}:{}),...(D.nestSimpleRevision?{nestSimpleRevision:D.nestSimpleRevision}:{}),modelAccess:2,track:'nest',positions:{nest:0,cloud:0},cue:0,mode:'observe',full:false,answers:{},solved:[],checked:[]};
 if(saved?.version===1&&saved.unit==='nm'&&saved.caseId==='CH-07'){
  s.track=saved.track==='cloud'?'cloud':'nest';
  for(const t of ['nest','cloud'])if(Number.isInteger(saved.positions?.[t])&&D.tracks[t][saved.positions[t]])s.positions[t]=saved.positions[t];
  for(const [k,v] of Object.entries(saved.answers||{})){
   const [t,...parts]=k.split(':');const item=D.tracks[t]?.find(x=>x.id===parts.join(':'));
   if(!item||!v||typeof v!=='object'||(saved.modelAccess!==2&&t==='cloud'&&item.kind==='repository'))continue;
   const used=new Set();s.answers[k]={};
   for(const [slot,piece] of Object.entries(v))if(item.cues[+slot]&&item.cues[+piece]&&typeof piece==='string'&&!used.has(piece)){s.answers[k][slot]=piece;used.add(piece);}
  }
  s.solved=(saved.solved||[]).filter(k=>{const [t,...p]=k.split(':');const item=D.tracks[t]?.find(x=>x.id===p.join(':'));return item?.cues.length&&item.cues.every((cue,i)=>cue.token===item.cues[+s.answers[k]?.[i]]?.token);});
  s.checked=(saved.checked||[]).filter(k=>typeof k==='string'&&k.length<100&&!(saved.modelAccess!==2&&k.startsWith('cloud:')&&D.tracks.cloud.some(x=>x.id===k.slice(6)&&x.kind==='repository')));
  if(saved.returnTo&&D.tracks[saved.returnTo.track]?.some(x=>x.id===saved.returnTo.id))s.returnTo={track:saved.returnTo.track,id:saved.returnTo.id};
  s.mode=saved.mode==='build'?'build':'observe';s.full=saved.full===true;
  s.cue=Number.isInteger(saved.cue)?Math.max(0,Math.min(saved.cue,D.tracks[s.track][s.positions[s.track]].cues.length-1)):0;
 }
 return s;
}
function shell(){
 root.innerHTML=`<div class="nm-app"><div class="nm-menu"><div class="nm-menu-content"><header class="nm-top"><div><span class="nm-eyebrow">CH-07 · AMPLIACIÓN N:M</span><h1>Excursiones y guias</h1><p>Entiende la relación. Construye las dos versiones. Comprueba tus datos.</p></div><div class="nm-tech" aria-label="Tecnología">${[['nest','Nest + TypeORM'],['cloud','Serverless + Toolbox']].map(([t,label])=>`<button type="button" data-action="track" data-track="${t}">${label}</button>`).join('')}</div></header><div class="nm-toolbar"><button type="button" data-action="baseline">Abrir preparación 1:N</button><a href="fichas-nm.pdf" target="_blank" rel="noopener">Fichas N:M para imprimir ↗</a><a data-reference target="_blank" rel="noopener">Código completo ↗</a></div><nav class="nm-chapters" aria-label="Orden de la ampliación"></nav><nav class="nm-files" aria-label="Pasos y archivos de este apartado"></nav></div><button type="button" class="nm-summary" data-action="expand" aria-expanded="false" hidden></button></div><div class="nm-work"></div><p class="nm-announcement" role="status" aria-live="polite"></p></div>`;
 if(D.nestSimpleRevision){
  root.querySelector('.nm-toolbar a').textContent='Fichas anteriores (con Repository) ↗';
 }
 root.addEventListener('click',onClick);
 root.addEventListener('dragstart',onDragStart);root.addEventListener('dragover',onDragOver);root.addEventListener('drop',onDrop);root.addEventListener('dragend',cleanDrag);
 root.addEventListener('pointerdown',onPointerDown);root.addEventListener('pointermove',onPointerMove);root.addEventListener('pointerup',onPointerUp);root.addEventListener('pointercancel',cleanDrag);
 window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',syncMenu);
 root.addEventListener('focusin',e=>{if(e.target.closest('.nm-menu-content'))setMenu(false);});
 new ResizeObserver(()=>{syncMenu();resize();}).observe(root);
}
function slotView(i){const id=S.answers[key()]?.[i],text=id!==undefined?stage().cues[+id]?.token:'';return `<button type="button" class="nm-slot" data-slot="${i}" data-filled="${id!==undefined}" data-good="${S.solved.includes(key())}" draggable="${id!==undefined}" ${id!==undefined?`data-piece="${id}"`:''} aria-label="Hueco ${i+1}">${text?esc(text):'⟦ '+(i+1)+' ⟧'}</button>`;}
function schema(){return `<div class="nm-logical"><a href="esquema-logico.svg" target="_blank" rel="noopener"><img src="esquema-logico.svg" alt="Esquema lógico aprobado: Agencia tiene Excursiones; Asignacion enlaza Excursion con Guia mediante dos PK y FK."></a><a class="nm-small-link" href="esquema-logico.svg" target="_blank" rel="noopener">Ampliar el esquema aprobado ↗</a><div class="nm-key-pair"><strong>ASIGNACION</strong><div><span>PK compuesta</span><code>${S.mode==='build'?'('+slotView(0)+', '+slotView(1)+')':'(ID_EXCURSION, ID_GUIA)'}</code></div><div><span>FK</span><code>ID_EXCURSION → EXCURSION.ID</code></div><div><span>FK</span><code>ID_GUIA → GUIA.ID</code></div><div><span>DATO</span><code>${S.mode==='build'?slotView(2):'ROL'}</code></div></div></div>`;}
function mapping(){return `<p class="nm-note">En este dibujo de DynamoDB, PK significa partition key y SK significa sort key. La clave primaria de ASIGNACIONES necesita los dos valores. En el esquema lógico SQL, PK significa clave primaria.</p><div class="nm-tables">${[
 ['AGENCIAS',[['PK','AGENCIA_ID'],['DATO','NOMBRE']]],['EXCURSIONES',[['PK','EXCURSION_ID'],['DATO','NOMBRE'],['DATO','DURACION_HORAS'],['REF','AGENCIA_ID']]],['GUIAS',[['PK','GUIA_ID'],['DATO','NOMBRE'],['DATO','APELLIDOS'],['DATO','EMAIL']]],['ASIGNACIONES',[['PK','EXCURSION_ID'],['SK','GUIA_ID'],['DATO','ROL']]]
 ].map(([name,fields])=>`<section class="nm-table"><h3>${name}</h3>${fields.map(([role,field])=>`<div><b data-role="${role}">${role}</b><code>${S.mode==='build'&&name==='ASIGNACIONES'?slotView(field==='EXCURSION_ID'?0:field==='GUIA_ID'?1:2):field}</code></div>`).join('')}</section>`).join('')}</div><div class="nm-index"><b>PorGuia · índice global</b><div><span>PK</span><code>GUIA_ID</code><span>SK</span><code>EXCURSION_ID</code></div><p>INCLUDE copia también ROL. DynamoDB mantiene el índice cuando escribes en la tabla.</p></div>`;}
function dataCards(direction='excursion'){
 const groups=direction==='excursion'?[['Excursion 7',D.asignaciones.filter(x=>x.excursionId===7)],['Excursion 8',D.asignaciones.filter(x=>x.excursionId===8)]]:[['Guia 1',D.asignaciones.filter(x=>x.guiaId===1)],['Guia 2',D.asignaciones.filter(x=>x.guiaId===2)]];
 return `<div class="nm-groups">${groups.map(([title,rows])=>`<section><h3>${title}</h3>${rows.map(r=>`<div class="nm-association"><span class="nm-id">${r.excursionId}</span><span class="nm-id nm-prof">${r.guiaId}</span><strong>${esc(r.rol)}</strong><small>excursion · guia</small></div>`).join('')}</section>`).join('')}</div>`;
}
function travellingData(chapter){
 const pairs={3:[['nombre','Lucía'],['apellidos','Navarro Gil'],['email','lucia.navarro@example.test']],4:[['excursionId · ruta','8'],['guiaId · cuerpo','2'],['rol · cuerpo','Apoyo logístico']],5:[['excursionId · ruta','7'],['respuesta','dos asignaciones']],6:[['guiaId · ruta','1'],['respuesta','excursiones 7 y 8']],7:[['excursionId · ruta','7'],['guiaId · ruta','1'],['rol · cuerpo','Jefe de equipo']],8:[['excursionId · ruta','7'],['guiaId · ruta','1'],['respuesta','204 · sin cuerpo']]};
 return (pairs[chapter]||[]).map(([name,value])=>`<span>${esc(name)}</span><b>${esc(value)}</b>`).join('');
}
function scene(){
 const s=stage(),c=D.cases[s.chapter-3],focus=s.focus;
 if(D.ormDataRevision&&S.track==='nest'&&['datos','cargar'].includes(s.id))return `<div class="nm-scene-header"><span>CARGAR Y LEER DESDE LAS ENTITIES</span><b>TypeORM</b></div><div class="nm-startup-diagram"><article><span class="nm-startup-symbol">1</span><div><strong>Ejecuta el archivo de datos</strong><code>node --env-file=.env<br>dist/datos/cargar-datos-nm.js</code><small>Utiliza AppModule y la conexión que ya preparaste.</small></div></article><div class="nm-startup-link">↓</div><article><span class="nm-startup-symbol">2</span><div><strong>Guia + Asignacion</strong><code>findOneBy(...)<br>save(...)<br>find(...)</code><small>Busca los ejemplos, crea los que faltan y lee el resultado.</small></div></article><div class="nm-startup-link">↓</div><article><span class="nm-startup-symbol">3</span><div><strong>PostgreSQL + IDs reales</strong><code>. ./ids-aula.env</code><small>Recupera los IDs generados para utilizarlos en tus peticiones curl.</small></div></article></div>`;
 if(s.runbook)return `<div class="nm-scene-header"><span>ARRANCAR ANTES DE CONSULTAR</span><b>Dos terminales</b></div><div class="nm-startup-diagram"><article><span class="nm-startup-symbol">BD</span><div><strong>PostgreSQL</strong><small>Servidor encendido · base 1:N conservada</small></div></article><div class="nm-startup-link"><span>↑ consulta a la base · datos ↓</span></div><article class="nm-startup-server"><span class="nm-startup-symbol">1</span><div><strong>Terminal 1 · Nest</strong><code>npm run build<br>npm run start</code><small>Se queda ejecutándose y atiende peticiones</small></div></article><div class="nm-startup-link"><span>↑ petición HTTP · respuesta JSON ↓</span></div><article><span class="nm-startup-symbol">2</span><div><strong>Terminal 2 · pruebas</strong><code>curl /salud<br>curl /excursiones</code><small>Escribes las consultas sin cerrar Nest</small></div></article></div><p class="nm-startup-caption">Ejecuta el proyecto en la Terminal 1 y déjala abierta. En la Terminal 2 comprueba que la API responde. Si Nest ya estaba arrancado, empieza directamente por las pruebas.</p>`;
 if(s.kind==='logical')return `<div class="nm-scene-header"><span>UNA CLAVE, DOS VALORES</span><b>1:N + N:M</b></div><div class="nm-pair-diagram"><div><b>EXCURSION</b><strong>ID = 7</strong></div><span>↘</span><div><b>GUIA</b><strong>ID = 1</strong></div><div class="nm-link-card"><b>ASIGNACION</b><strong>(7, 1)</strong><span>ROL = Guía de ruta</span></div></div><p>El par (7,1) identifica una fila. (7,2) es otra fila: cambia el guia.</p>`;
 if(s.kind==='story')return `<div class="nm-scene-header"><span>EL MISMO GUIA, OTRA EXCURSION</span><b>Datos iniciales</b></div>${dataCards('guia')}<p>Diego (ID 1) es Guía de ruta en la excursion 7 y Coordinación en la 8. El rol pertenece a la asignación.</p>`;
 if(s.kind==='mapping')return `<div class="nm-scene-header"><span>DOS ORGANIZACIONES DE LOS MISMOS ÍTEMS</span><b>Tabla + GSI</b></div><div class="nm-direction"><button type="button" data-action="direction" data-direction="excursion" aria-pressed="${S.direction!=='guia'}">Por excursion · tabla</button><button type="button" data-action="direction" data-direction="guia" aria-pressed="${S.direction==='guia'}">Por guia · índice</button></div>${dataCards(S.direction||'excursion')}<p>ASIGNACIONES: PK + SK = (EXCURSION_ID, GUIA_ID). El índice invierte su papel. Las referencias no son claves foráneas automáticas en DynamoDB.</p>`;
 if(s.kind==='model'&&D.nestSimpleRevision&&S.track==='nest')return `<div class="nm-scene-header"><span>TRES ARCHIVOS · UNA RELACIÓN N:M</span><b>Entities TypeORM</b></div><div class="nm-entity-files">${[['excursion-inversa','Excursion','excursion.entity.ts',[['ID','PK'],['NOMBRE',''],['DURACION_HORAS',''],['ID_AGENCIA','FK']]],['asig-inversas','Asignacion','asignacion.entity.ts',[['ID_EXCURSION','PK · FK'],['ID_GUIA','PK · FK'],['ROL','']]],['guia','Guia','guia.entity.ts',[['ID','PK'],['NOMBRE',''],['APELLIDOS',''],['EMAIL','']]]].map(([id,name,file,fields],i)=>`<button type="button" data-action="model-file" data-model="${id}" aria-pressed="${s.id===id}"><small>${i===1?'Vínculo entre ambos':'Entidad'} · ${file}</small><strong>${name}</strong>${fields.map(([field,key])=>`<span><code>${field}</code><b>${key}</b></span>`).join('')}<em>${i===1?'Clave compuesta: los dos IDs juntos':'1 → N asignaciones'}</em></button>`).join('')}</div><p class="nm-startup-caption">Excursion y Guia se relacionan a través de Asignacion. Cada fila guarda una pareja de IDs y su rol. Agencia conserva su relación 1:N con Excursion.</p>`;
 if(s.kind==='review'&&D.nestSimpleRevision&&S.track==='nest')return `<div class="nm-scene-header"><span>EL MISMO SERVICE, DISTINTAS OPERACIONES</span><b>TypeORM</b></div><div class="nm-command-grid">${[['findOneBy()','Lee un registro por su ID'],['save()','Crea un guia'],['insert()','Crea el vínculo con dos IDs'],['find({ where })','Lee los vínculos por uno de sus extremos'],['update()','Cambia el rol'],['delete()','Quita solo el vínculo']].map(([name,note])=>`<div><b>${name}</b><span>${note}</span></div>`).join('')}</div>`;
 if(s.kind==='review')return `<div class="nm-scene-header"><span>LOS SEIS COMANDOS</span><b>Mismo dominio</b></div><div class="nm-command-grid">${[['get() → GetItemCommand','Lee un extremo por ID'],['put() → PutItemCommand','Crea perfil o vínculo'],['scan() → ScanCommand','Lista perfiles'],['query() → QueryCommand','Agrupa por excursion o guia'],['update() → UpdateItemCommand','Cambia solo ROL'],['delete() → DeleteItemCommand','Quita solo el vínculo']].map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>`;
 const nodes=[['request','Petición',c?'IDs + datos':'Tu terminal'],['entry',S.track==='nest'?'Controller':'Handler','Recibe ruta y cuerpo'],['service','Service','Organiza el caso'],...(D.nestSimpleRevision&&S.track==='nest'?[['model','Entities','Describen los datos'],['database','PostgreSQL','Guarda o consulta']]:[['repository','Repository','Usa los modelos'],['model',S.track==='nest'?'Entities + SQL':'Table + Entity','Guarda o consulta']]),['response','Respuesta','Devuelve el resultado']];
 return `<div class="nm-scene-header"><span>${c?esc(c.title.toUpperCase()):'PREPARA EL ACCESO A LOS DATOS'}</span><b>${S.track==='nest'?'PostgreSQL':'DynamoDB'}</b></div><div class="nm-trace">${nodes.map(([id,label,meaning],i)=>`<button type="button" data-action="node" data-node="${id}" data-active="${focus===id}" aria-pressed="${focus===id}"><i>${i+1}</i><span class="nm-node-icon" aria-hidden="true">${['⌘','{ }','↳','▤','◉','↩'][i]}</span><strong>${label}</strong><small>${meaning}</small></button>`).join('')}</div>${c?`<div class="nm-command-chip">${esc(S.track==='cloud'?c.cmd:['Service → save() · find()','Service → findOneBy() · insert()','Service → find({ where: { excursionId } })','Service → find({ where: { guiaId } })','Service → update()','Service → delete()'][s.chapter-3])}</div><div class="nm-travel-key">${travellingData(s.chapter)}</div>`:`<div class="nm-model-summary"><b>4 tablas · 1 asociación</b><span>AGENCIA → EXCURSION ↔ GUIA</span><span>La N:M se guarda en ASIGNACION.</span></div>`}`;
}
function sourceHTML(){
 const s=stage(),answers=S.answers[key()]||{};
 const sorted=s.cues.map((cue,i)=>({...cue,i})).sort((a,b)=>a.start-b.start);
 let pos=0,html='';
 for(const cue of sorted){
  html+=esc(s.code.slice(pos,cue.start));
  if(S.mode==='build'){
   const id=answers[cue.i];const text=id!==undefined?s.cues[+id]?.token:'';
   html+=`<button type="button" class="nm-slot" data-slot="${cue.i}" data-filled="${id!==undefined}" data-good="${S.solved.includes(key())}" draggable="${id!==undefined}" ${id!==undefined?`data-piece="${id}"`:''} aria-label="Hueco ${cue.i+1}: ${esc(cue.note)}">${text?esc(text):'⟦ '+(cue.i+1)+' ⟧'}</button>`;
  }else html+=`<mark class="${cue.i===S.cue?'active':''}" data-cue-code="${cue.i}">${esc(cue.token)}</mark>`;
  pos=cue.end;
 }
 html+=esc(s.code.slice(pos));
 return html.split('\n').map((line,i)=>`<span class="nm-line" data-line="${i+1}">${line||' '}</span>`).join('');
}
function startupBlocks(s){
 return (s.runbook||[]).map((block,i)=>`<section class="nm-run-block"><div class="nm-editor-head"><strong>${esc(block.title)}</strong><button type="button" data-action="copy-runbook" data-block="${i}">Copiar bloque ${i+1}</button></div><div class="nm-run-instructions"><b>${esc(block.terminal)}</b><p>${esc(block.instruction)}</p></div><pre class="nm-run-source" tabindex="0" aria-label="${esc(block.title)}"><code>${esc(block.code)}</code></pre><p class="nm-run-expect"><b>Antes de seguir:</b> ${esc(block.expect)}</p></section>`).join('');
}
function bank(){
 const s=stage(),used=new Set(Object.values(S.answers[key()]||{}));
 return s.cues.map((c,i)=>({id:String(i),token:c.token})).filter(x=>!used.has(x.id)&&+x.id===S.cue).sort((a,b)=>a.token.localeCompare(b.token)).map(x=>`<button type="button" draggable="true" class="nm-piece" data-piece="${x.id}" data-action="piece" aria-pressed="${selected===x.id}">${esc(x.token)}</button>`).join('');
}
function render(){
 const before=document.activeElement;
 const focus=before&&root.contains(before)?['action','track','chapter','step','cue','slot','piece','block'].filter(k=>before.dataset[k]!==undefined).map(k=>`[data-${k}="${CSS.escape(before.dataset[k])}"]`).join(''):'';
 const top=window.scrollY,s=stage(),list=D.tracks[S.track],chapter=s.chapter;
 S.cue=Math.max(0,Math.min(S.cue,s.cues.length-1));
 const currentChapter=$('.nm-files').dataset.chapter;
 $$('.nm-tech button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track===S.track)));
 if(!$('.nm-chapters').children.length)$('.nm-chapters').innerHTML=D.chapters.map((label,i)=>`<button type="button" data-action="chapter" data-chapter="${i}" aria-current="${i===chapter?'step':'false'}"><b>${String(i+1).padStart(2,'0')}</b>${esc(label)}</button>`).join('');
 $$('.nm-chapters button').forEach(b=>b.setAttribute('aria-current',+b.dataset.chapter===chapter?'step':'false'));
 if($('.nm-files').dataset.chapter!==String(chapter)||$('.nm-files').dataset.track!==S.track)$('.nm-files').innerHTML=list.map((x,i)=>({x,i})).filter(({x})=>x.chapter===chapter).map(({x,i},j)=>`<button type="button" data-action="step" data-step="${i}" aria-current="${i===S.positions[S.track]?'step':'false'}">${j+1} · ${esc(x.title)}${S.solved.includes(S.track+':'+x.id)||S.checked.includes(S.track+':'+x.id)?' ✓':''}</button>`).join('');
 $('.nm-files').dataset.chapter=String(chapter);$('.nm-files').dataset.track=S.track;
 $$('.nm-files button').forEach(b=>{const item=list[+b.dataset.step];b.setAttribute('aria-current',+b.dataset.step===S.positions[S.track]?'step':'false');b.textContent=(list.filter((x,i)=>x.chapter===chapter&&i<=+b.dataset.step).length)+' · '+item.title+(S.solved.includes(S.track+':'+item.id)||S.checked.includes(S.track+':'+item.id)?' ✓':'');});
 $('[data-reference]').href='https://github.com/albertohdezakkari/typeorm-portal-2si-2sid/tree/main/nm/casos/CH-07/codigo/'+S.track;
 const cue=s.cues[S.cue];
 const body=s.kind==='logical'?schema():s.kind==='mapping'?mapping():s.kind==='story'?`<div class="nm-story"><h3>Excursion 7 · Ruta del bosque</h3><div class="nm-people">${D.guias.map(p=>`<div><i aria-hidden="true">${esc(p.nombre[0])}</i><b>${esc(p.nombre)} ${esc(p.apellidos)}</b><span>ID ${p.guiaId}</span></div>`).join('')}</div>${dataCards('excursion')}<p>La excursion 7 tiene dos guias. El guia 1 participa en dos excursiones. Una columna dentro de EXCURSION no puede guardar limpiamente esta relación.</p></div>`:s.kind==='review'?`<div class="nm-review"><h3>Comprueba tu ampliación</h3>${['Identifico ASIGNACION por los dos IDs.','Explico qué guarda ROL y por qué no pertenece a GUIA.',D.nestSimpleRevision&&S.track==='nest'?'Sé filtrar las asignaciones con find y where.':'Sé elegir Query de tabla o Query del índice.','Puedo seguir la llamada hasta la base y explicar la respuesta.','He comprobado que borrar (7,1) conserva excursiones, guias y otros vínculos.'].map(x=>`<p>□ ${x}</p>`).join('')}<a class="nm-btn" href="fichas-nm.pdf" target="_blank" rel="noopener">Abrir las fichas para repasar ↗</a></div>`:`<section class="nm-editor"><div class="nm-editor-head"><strong>${esc(s.commandTitle||s.path||'Terminal · '+(S.track==='nest'?'tu proyecto Nest':'tu proyecto Serverless'))}</strong><div><button type="button" data-action="copy">${s.runbook?'Copiar pruebas':s.path?.endsWith('.json')?'Copiar JSON':s.path?'Copiar archivo completo':'Copiar comando'}</button><button type="button" data-action="full">${S.full?'Volver al visor':s.runbook?'Ver pruebas completas':'Ver archivo completo'}</button></div></div>${s.commandIntro?`<p class="nm-command-intro">${esc(s.commandIntro)}</p>`:''}<pre class="nm-source ${S.full?'full':''}" tabindex="0" aria-label="${esc(s.path||s.title)}"><code>${sourceHTML()}</code></pre></section>`;
 $('.nm-work').innerHTML=`<div class="nm-heading"><div><span class="nm-eyebrow">PASO ${S.positions[S.track]+1} DE ${list.length} · ${S.track==='nest'?'NEST + TYPEORM':'SERVERLESS + TOOLBOX'}</span><h2>${esc(s.title)}</h2></div><span class="nm-progress">${list.filter(x=>S.solved.includes(S.track+':'+x.id)||S.checked.includes(S.track+':'+x.id)).length} / ${list.length} pasos</span></div><p class="nm-where">Trabaja en la carpeta de <strong>tu proyecto ${S.track==='nest'?'Nest':'Serverless'}</strong> · ${S.track==='nest'?'Git Bash (Windows) o Terminal (macOS)':'Terminal Bash local o del Codespace'}</p>${s.note?`<p class="nm-note">${esc(s.note)}</p>`:''}${s.create?`<section class="nm-create"><div><b>${s.updateExisting?'1 · Abre el archivo existente':s.path?.endsWith('.json')?'1 · Crea y abre el fichero JSON':'1 · Crea y abre el archivo'}</b><button type="button" data-action="copy-create">Copiar creación y apertura</button></div><pre>${esc(s.create)}</pre><p>Después copia el contenido completo de la caja siguiente y guarda el archivo.</p></section>`:''}<div class="nm-grid"><div class="nm-action">${startupBlocks(s)}${body}</div><aside class="nm-visual"><div class="nm-canvas">${scene()}${s.chapter>=3&&s.chapter<=8?`<div class="nm-model-links">${(S.track==='cloud'?[['table','Ver Table'],['entity','Ver Entity']]:[['asig-inversas','Ver Asignacion'],[D.nestSimpleRevision?'guia':'prof-inversa','Ver Guia']]).map(([id,label])=>`<button type="button" data-action="model-file" data-model="${id}">${label} ↗</button>`).join('')}</div>`:''}</div>${cue?`<div class="nm-explanation"><span>EXPLICACIÓN ${S.cue+1} DE ${s.cues.length}</span><strong><code>${esc(cue.token)}</code></strong><p>${esc(cue.note)}</p></div>`:''}</aside></div>${s.cues.length?`<div class="nm-explain-nav" aria-label="Explicaciones del archivo">${s.cues.map((c,i)=>`<button type="button" data-action="cue" data-cue="${i}" aria-current="${i===S.cue?'step':'false'}" title="${esc(c.note)}">${i+1}</button>`).join('')}<span>Explicación ${S.cue+1} de ${s.cues.length}</span><button type="button" data-action="next-cue">${S.cue===s.cues.length-1?'Volver a la explicación 1':'Siguiente explicación →'}</button></div><div class="nm-modes"><button type="button" data-action="play">Ver animación</button><button type="button" data-action="build">${S.mode==='build'?'Volver a observar':'Ahora lo monto yo'}</button><button type="button" data-action="check" ${S.mode!=='build'?'hidden':''}>Comprobar las piezas</button></div>${S.mode==='build'?`<div class="nm-bank"><b>${s.cues.length-Object.keys(S.answers[key()]||{}).length} piezas por colocar</b><p>Arrastra sobre el hueco o su línea. También puedes seleccionar una pieza y pulsar el hueco con ratón o teclado.</p><div class="nm-pieces">${bank()||'<span>Este fragmento está completo. Avanza con los números o comprueba el archivo si ya has terminado.</span>'}</div></div>`:''}<p class="nm-feedback" role="status">${S.solved.includes(key())?'Archivo completado. Puedes seguir o volver a repasarlo.':S.mode==='build'?'Coloca todas las piezas y comprueba el archivo.':'Sigue las explicaciones y después monta las piezas.'}</p>`:''}<div class="nm-checkpoint"><b>Antes de avanzar</b><p>${esc(s.expect)}</p><label><input type="checkbox" data-action="checked" ${S.checked.includes(key())?'checked':''}> ${hasCode(s)?'He realizado esta comprobación en mi proyecto':'He entendido y contrastado este paso'}</label><small>Esta marca es tu recordatorio. El cuaderno no ejecuta comandos ni comprueba tu servidor.</small></div><footer class="nm-bottom">${S.returnTo&&s.chapter===1?`<button type="button" data-action="return-case">Volver al caso (${S.returnTo.track==='nest'?'Nest':'Serverless'})</button>`:''}<button type="button" data-action="previous" ${S.positions[S.track]===0?'disabled':''}>← Paso anterior</button><button type="button" data-action="models">Volver a la preparación de modelos</button><button type="button" data-action="next" ${S.positions[S.track]===list.length-1||(s.cues.length&&!S.solved.includes(key())&&!S.checked.includes(key()))?'disabled':''}>Siguiente paso →</button></footer>`;
 const creation=$('.nm-create');if(creation)$('.nm-action').prepend(creation);
 const pieceBank=$('.nm-bank');
 if(pieceBank){
  const editor=$('.nm-editor');
  if(editor)editor.insertBefore(pieceBank,editor.querySelector('.nm-source'));
  else if(s.kind==='logical')$('.nm-key-pair').before(pieceBank);
  else if(s.kind==='mapping')$('.nm-table:last-child h3').after(pieceBank);
 }
 $('.nm-app').dataset.mode=S.mode;
 $('.nm-summary').innerHTML=`<b>Paso ${S.positions[S.track]+1} de ${list.length}</b><span>${esc(s.title)}</span><strong>Mostrar menú ⌄</strong>`;
 if(focus)root.querySelector(focus)?.focus({preventScroll:true});
 window.scrollTo({top,behavior:'instant'});
 focusCode();syncMenu();resize();
}
function focusCode(){
 const source=$('.nm-source');const target=S.mode==='build'?$(`[data-slot="${S.cue}"]`):$(`[data-cue-code="${S.cue}"]`);
 if(!source||!target||S.full)return;
 const a=source.getBoundingClientRect(),b=target.getBoundingClientRect();
 if(b.top<a.top+12||b.bottom>a.bottom-12)source.scrollTop+=b.top-a.top-source.clientHeight*.32;
}
function go(index){stop();selected=null;S.positions[S.track]=Math.max(0,Math.min(index,D.tracks[S.track].length-1));S.cue=0;S.mode='observe';S.full=false;save();render();}
function setMenu(value){
 menuCollapsed=value;
 const menu=$('.nm-menu'),visible=value&&menu.dataset.pinned==='true';
 menu.dataset.collapsed=String(visible);$('.nm-menu-content').inert=visible;$('.nm-menu-content').setAttribute('aria-hidden',String(visible));$('.nm-summary').hidden=!visible;$('.nm-summary').setAttribute('aria-expanded',String(!visible));
}
function syncMenu(){const menu=$('.nm-menu');if(!menu)return;menu.dataset.pinned=String($('.nm-menu-content').offsetHeight<(outerHeight||innerHeight)*.72);menu.style.transform=menu.dataset.pinned==='true'&&outerOffset?'translateY('+Math.max(0,Math.min(outerOffset,root.offsetHeight-menu.offsetHeight))+'px)':'';setMenu(menuCollapsed);}
function onScroll(){
 if(scrollFrame)return;
 scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;const now=window.scrollY,delta=now-scrollYBefore;scrollYBefore=now;if(Math.abs(delta)<2)return;const dir=delta>0?1:-1;if(dir!==scrollDirection){scrollDistance=0;scrollDirection=dir;}scrollDistance+=Math.abs(delta);if(scrollDistance<12)return;scrollDistance=0;if(keyboardNavigation&&$('.nm-menu-content').contains(document.activeElement))return;setMenu(dir>0&&$('.nm-menu').getBoundingClientRect().top<=1);});
}
function say(text,bad=false){const f=$('.nm-feedback')||$('.nm-announcement');f.textContent=text;f.dataset.kind=bad?'bad':'good';resize();}
async function onClick(event){
 const button=event.target.closest('[data-action]');if(!button)return;
 const a=button.dataset.action;
 if(a==='track'){
  const previous=stage(),from=S.track;stop();S.track=button.dataset.track;const pairs={nest:{guia:'entity',asignacion:'entity','excursion-inversa':'entity','prof-inversa':'entity','asig-inversas':'entity',registrar:'infra',arrancar:'desplegar',cargar:'leer-datos'},cloud:{infra:'registrar',table:D.nestSimpleRevision?'asig-inversas':'asignacion',entity:D.nestSimpleRevision?'asig-inversas':'asignacion',desplegar:'arrancar','leer-datos':'cargar'}};let counterpart=pairs[from][previous.id]||previous.id;if(previous.id.endsWith('-evento'))counterpart=previous.id.replace(/-evento$/,'-entry');if(previous.id.endsWith('-invoke'))counterpart=previous.id.replace(/-invoke$/,'-curl');const same=D.tracks[S.track].findIndex(x=>x.id===counterpart);S.positions[S.track]=same>=0?same:D.tracks[S.track].findIndex(x=>x.chapter===previous.chapter);S.mode='observe';S.cue=0;selected=null;save();render();return;
 }
 if(a==='step')return go(+button.dataset.step);
 if(a==='chapter')return go(D.tracks[S.track].findIndex(x=>x.chapter===+button.dataset.chapter));
 if(a==='previous'||a==='next')return go(S.positions[S.track]+(a==='next'?1:-1));
 if(a==='models'||a==='model-file'){S.returnTo={track:S.track,id:stage().id};return go(D.tracks[S.track].findIndex(x=>x.id===(button.dataset.model||(S.track==='cloud'?'table':'asig-inversas'))));}
 if(a==='return-case'){const target=S.returnTo;delete S.returnTo;S.track=target.track;return go(D.tracks[S.track].findIndex(x=>x.id===target.id));}
 if(a==='baseline')return send('nm:baseline',{track:S.track});
 if(a==='expand'){setMenu(false);$('.nm-files [aria-current=step]')?.focus({preventScroll:true});return;}
 if(a==='direction'){S.direction=button.dataset.direction;render();return;}
 if(a==='node'){
  const node=button.dataset.node;const found=D.tracks[S.track].findIndex(x=>x.chapter===stage().chapter&&x.focus===node);if(found>=0)go(found);else if(node==='model'){S.returnTo={track:S.track,id:stage().id};go(D.tracks[S.track].findIndex(x=>x.id===(S.track==='cloud'?'table':'asig-inversas')));}return;
 }
 if(a==='cue'||a==='next-cue'){
  stop();S.cue=a==='cue'?+button.dataset.cue:(S.cue+1)%stage().cues.length;save();render();return;
 }
 if(a==='play'){
  if(timer){stop();return;}
  const tick=()=>{S.mode='observe';selected=null;render();$('[data-action=play]').textContent='Pausar animación';if(S.cue<stage().cues.length-1)timer=setTimeout(()=>{S.cue++;tick();save();},1900);else{timer=setTimeout(()=>{stop();say('Has recorrido las explicaciones. Ahora puedes montar el archivo.');},1900);}};
  S.cue=0;tick();return;
 }
 if(a==='build'){stop();S.mode=S.mode==='build'?'observe':'build';selected=null;save();render();return;}
 if(a==='piece'){selected=button.dataset.piece;$$('.nm-piece').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.piece===selected)));say('Pieza seleccionada. Pulsa un hueco o arrástrala sobre su línea.');return;}
 if(a==='full'){S.full=!S.full;render();return;}
 if(a==='checked'){S.checked=S.checked.filter(k=>k!==key());if(button.checked)S.checked.push(key());save();render();return;}
 if(a==='copy-runbook'){
  const block=stage().runbook?.[+button.dataset.block];if(!block)return;
  try{await navigator.clipboard.writeText(block.code);button.textContent='Copiado';}catch{say('Selecciona el contenido del bloque para copiarlo.');}return;
 }
 if(a==='check'){
  const s=stage(),answers=S.answers[key()]||{};const wrong=s.cues.findIndex((cue,i)=>cue.token!==s.cues[+answers[i]]?.token);
  if(wrong>=0){S.cue=wrong;save();render();$(`[data-slot="${wrong}"]`)?.setAttribute('data-bad','true');say('Revisa el hueco '+(wrong+1)+': '+s.cues[wrong].note,true);}else{if(!S.solved.includes(key()))S.solved.push(key());save();render();say('Archivo correcto. Has conectado sus piezas; compruébalo también en tu proyecto.');}return;
 }
 if(a==='copy'||a==='copy-create'){
  try{await navigator.clipboard.writeText(a==='copy'?stage().code:stage().create);button.textContent='Copiado';}catch{say('Selecciona el contenido de la caja para copiarlo.');}return;
 }
}
root.addEventListener('click',event=>{
 const slot=event.target.closest('[data-slot]');if(!slot||S.mode!=='build')return;
 if(selected!==null)place(+slot.dataset.slot,selected);else if(slot.dataset.filled==='true'){selected=slot.dataset.piece;say('Pieza seleccionada. Puedes moverla a otro hueco.');}
});
function place(slot,piece){
 const s=stage();if(!s.cues[slot]||!s.cues[+piece])return;
 const answers=S.answers[key()]||{};const previous=Object.keys(answers).find(k=>answers[k]===piece);const displaced=answers[slot];
 if(previous!==undefined)delete answers[previous];answers[slot]=piece;
 if(previous!==undefined&&+previous!==slot&&displaced!==undefined)answers[previous]=displaced;
 S.answers[key()]=answers;const next=s.cues.findIndex((_,i)=>answers[i]===undefined);if(next>=0)S.cue=next;S.solved=S.solved.filter(k=>k!==key());selected=null;cleanDrag();save();render();$(`[data-slot="${slot}"]`)?.focus({preventScroll:true});say('Pieza colocada. Puedes moverla o comprobar el archivo.');
}
function targetAt(x,y){
 const slots=$$('[data-slot]');let best=null,score=Infinity;
 for(const slot of slots){const r=slot.getBoundingClientRect();const line=slot.closest('.nm-line')?.getBoundingClientRect()||r;if(y>=line.top-18&&y<=line.bottom+18&&x>=line.left-20&&x<=line.right+20){const d=Math.abs(y-(r.top+r.height/2))*3+Math.max(r.left-x,0,x-r.right);if(d<score){best=slot;score=d;}}}
 return best;
}
function highlight(slot){$$('[data-drop]').forEach(x=>x.removeAttribute('data-drop'));slot?.setAttribute('data-drop','true');}
function onDragStart(event){const el=event.target.closest('[data-piece]');if(!el||S.mode!=='build')return;selected=el.dataset.piece;event.dataTransfer.setData('text/plain',selected);event.dataTransfer.effectAllowed='move';}
function onDragOver(event){if(S.mode!=='build'||selected===null)return;const slot=targetAt(event.clientX,event.clientY);if(slot){event.preventDefault();event.dataTransfer.dropEffect='move';}highlight(slot);}
function onDrop(event){const slot=targetAt(event.clientX,event.clientY);if(slot&&selected!==null){event.preventDefault();place(+slot.dataset.slot,selected);}cleanDrag();}
function onPointerDown(event){const el=event.target.closest('[data-piece]');if(!el||event.pointerType==='mouse'||S.mode!=='build')return;drag={id:el.dataset.piece,x:event.clientX,y:event.clientY,moving:false,pointer:event.pointerId,el};el.setPointerCapture(event.pointerId);}
function onPointerMove(event){if(!drag)return;if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>7)drag.moving=true;if(!drag.moving)return;event.preventDefault();selected=drag.id;highlight(targetAt(event.clientX,event.clientY));}
function onPointerUp(event){if(!drag)return;const moved=drag.moving;const id=drag.id;const slot=moved?targetAt(event.clientX,event.clientY):null;if(slot){event.preventDefault();place(+slot.dataset.slot,id);}cleanDrag();}
function cleanDrag(){highlight(null);if(drag?.el.hasPointerCapture?.(drag.pointer))drag.el.releasePointerCapture(drag.pointer);drag=null;}
async function init(payload){
 if(ready)return;binding=payload?.binding||null;
 try{D=await (await fetch('CH-07.json?v=orm-todos-1')).json();S=defaults(payload?.state);ready=true;shell();render();send('nm:loaded');}
 catch(error){root.innerHTML='<p role="alert">No se ha podido abrir la unidad N:M. Recarga el cuaderno.</p>';send('nm:error',{message:error.message});}
}
window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent)return;if(event.data?.type==='nm:init')init(event.data);if(ready&&event.data?.binding===binding&&event.data.type==='nm:viewport'){outerHeight=event.data.height;outerOffset=event.data.offset;syncMenu();if(!(keyboardNavigation&&$('.nm-menu-content').contains(document.activeElement))){if(event.data.direction>0&&outerOffset>0)setMenu(true);else if(event.data.direction<0||outerOffset===0)setMenu(false);}}});
root.addEventListener('keydown',e=>{if(e.key==='Tab'||e.key.startsWith('Arrow'))keyboardNavigation=true;});
root.addEventListener('pointerdown',()=>{keyboardNavigation=false;});
if(parent===window)init({});else parent.postMessage({type:'nm:ready'},location.origin);
