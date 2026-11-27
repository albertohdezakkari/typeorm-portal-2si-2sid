export function montarTaller(data, {estadoInicial=null, guardar=()=>{}}={}) {

const root=document.getElementById('pdf-taller'),D=data,C=D.context,P=C.parent,N=C.child,M=C.metric;
const simpleNest=Boolean(D.nestSimpleRevision);
const guidedExplanation=root.dataset.tabsLayout==='wrap';
const schemaGuide=guidedExplanation&&Boolean(D.fieldGuide);
const $=s=>root.querySelector(s),$$=s=>[...root.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let track='nest',index=0,frame=0,mode='observe',full=false,playing=false,timer=null,selected=null,modelReturn=null,entityReturn=null,erObserver=null,erRaf=null,dragged=null,touchDrag=null,suppressClickUntil=0;
const solved=new Set(),observed=new Set(),answers={};
const stage=()=>D.steps[track][index],key=()=>track+':'+index;
function restore(p){
 if(p?.version!==5||p.caseId!==C.id)return;
 if(simpleNest&&p.nestSimpleRevision!==D.nestSimpleRevision){
  p=structuredClone(p);
  const keep=k=>!String(k).startsWith('nest:')||Number(String(k).split(':')[1])<4;
  p.answers=Object.fromEntries(Object.entries(p.answers||{}).filter(([k])=>keep(k)));
  p.solved=(p.solved||[]).filter(keep);p.observed=(p.observed||[]).filter(keep);
  if(p.track==='nest'&&p.index>=4){const chapter=D.legacyNestChapters?.[p.index]??0;p.index=chapter===0?4:Math.max(0,D.steps.nest.findIndex(s=>s.chapter===chapter));p.frame=0;p.mode='observe';p.full=false;}
 }
 track=p.track==='cloud'?'cloud':'nest';index=Number.isInteger(p.index)?Math.max(0,Math.min(p.index,D.steps[track].length-1)):0;
 const revised=new Set((p.preparationRevision??0)!==(D.preparationRevision??0)?D.revisedSteps||[]:[]);
 if((p.entityAccessRevision??0)!==(D.entityAccessRevision??0))for(const k of D.entityAccessSteps||[])revised.add(k);
 for(const [k,value] of Object.entries(p.answers||{})){
  if(revised.has(k))continue;
  const match=/^(nest|cloud):(\d+)$/.exec(k);if(!match)continue;const step=D.steps[match[1]][Number(match[2])];if(!step||!value||typeof value!=='object')continue;
  const used=new Set(),valid={};for(const [slot,id] of Object.entries(value)){const n=Number(slot),v=Number(id);if(!Number.isInteger(n)||n<0||n>=step.cues.length||typeof id!=='string'||!Number.isInteger(v)||v<0||v>=step.cues.length||used.has(id))continue;used.add(id);valid[n]=id;}answers[k]=valid;
 }
 for(const k of p.solved||[]){const [t,n]=String(k).split(':'),s=D.steps[t]?.[Number(n)];if(s&&s.cues.every((_,i)=>pieceMatches(s,i,answers[k]?.[i])))solved.add(k);}
 for(const k of p.observed||[])if(/^(nest|cloud):\d+$/.test(k)&&!revised.has(k))observed.add(k);
 mode=p.mode==='build'?'build':'observe';frame=Number.isInteger(p.frame)?Math.max(0,Math.min(p.frame,stage().cues.length-1)):0;full=p.full===true;
 if(revised.has(key())){mode='observe';frame=0;full=false;}
}
restore(estadoInicial);
const persist=()=>guardar({version:5,caseId:C.id,...(simpleNest?{nestSimpleRevision:D.nestSimpleRevision}:{}),preparationRevision:D.preparationRevision??0,entityAccessRevision:D.entityAccessRevision??0,track,index,frame,mode,full,solved:[...solved],observed:[...observed],answers:structuredClone(answers)});
function stop(){playing=false;clearTimeout(timer);timer=null;root.querySelectorAll('.p-fly').forEach(x=>x.remove());cancelDrag();}
function feedback(text,kind=''){ $('[data-feedback]').textContent=text;$('[data-feedback]').dataset.kind=kind; }
const isRelation=()=>stage().path==='Modelo entidad–relación';
function pieces(){return stage().cues.map((c,i)=>({id:String(i),text:c.text})).sort((a,b)=>a.text.localeCompare(b.text));}
function pieceMatches(step,slot,id){return typeof id==='string'&&(id===String(slot)||(schemaGuide&&step.cues[Number(id)]?.text===step.cues[slot]?.text));}
function marks(){let code=stage().code;return stage().cues.map((c,i)=>{const anchor=c.after?code.indexOf(c.after):0,start=anchor<0?-1:code.indexOf(c.text,anchor);if(start<0)throw new Error('No está la pista: '+c.text);return {i,start,end:start+c.text.length,line:code.slice(0,start).split('\n').length};});}
function syntax(text){return esc(text).replace(/\b(import|from|export|async|await|return|const|class|new|private|readonly|function)\b/g,'<span class="p-code-key">$1</span>');}
function bindSlots(){
 $$('[data-slot]').forEach(el=>{el.draggable=el.dataset.filled==='true';if(solved.has(key()))el.dataset.good='true';el.onclick=()=>{if(selected!==null)place(+el.dataset.slot,selected);else if(el.dataset.filled==='true'){selected=answers[key()][el.dataset.slot];renderBank();feedback('Pieza seleccionada. Arrástrala o pulsa otro hueco para moverla.');}else{frame=+el.dataset.slot;renderScene();feedback('Selecciona una pieza y después pulsa este hueco.');}};});
}
function clearDropHighlight(){ $$('[data-drop-over=true]').forEach(el=>delete el.dataset.dropOver); }
function dropSlotAt(x,y){
 if(mode!=='build')return null;
 const exact=document.elementFromPoint(x,y)?.closest('[data-slot]');if(exact&&root.contains(exact))return exact;
 const editor=$('.p-editor').getBoundingClientRect();if(x<editor.left-16||x>editor.right+16||y<editor.top||y>editor.bottom+16)return null;
 let best=null,bestDistance=Infinity;
 for(const el of $$('[data-slot]')){
  const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;
  const dx=Math.max(r.left-x,0,x-r.right),dy=Math.max(r.top-y,0,y-r.bottom);let distance=Math.hypot(dx,dy);
  const zone=el.closest('.p-line,[data-er-port=fk]');if(zone){const z=zone.getBoundingClientRect();if(x>=z.left&&x<=z.right&&y>=z.top-5&&y<=z.bottom+5)distance=Math.min(distance,dx*.001);}
  if(distance<=32&&distance<bestDistance){best=el;bestDistance=distance;}
 }
 return best;
}
function highlightDrop(el){clearDropHighlight();if(!el)return;el.dataset.dropOver='true';const zone=el.closest('.p-line,[data-er-port=fk]');if(zone)zone.dataset.dropOver='true';}
function cancelDrag(){clearDropHighlight();$$('[data-dragging]').forEach(el=>delete el.dataset.dragging);root.querySelector('.p-drag-ghost')?.remove();dragged=null;touchDrag=null;}
function dragSource(el){const source=el.closest('[data-piece],[data-slot][data-filled=true]');if(!source||!root.contains(source)||mode!=='build')return null;return {el:source,id:source.dataset.piece??answers[key()]?.[source.dataset.slot],key:key()};}
root.addEventListener('dragstart',e=>{const source=dragSource(e.target);if(!source)return;if(touchDrag){e.preventDefault();return;}dragged=source;source.el.dataset.dragging='true';e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',source.id);});
function dragHover(e){if(!dragged||dragged.key!==key())return;e.preventDefault();const target=dropSlotAt(e.clientX,e.clientY);highlightDrop(target);e.dataTransfer.dropEffect=target?'move':'none';}
root.addEventListener('dragenter',dragHover);
root.addEventListener('dragover',dragHover);
root.addEventListener('drop',e=>{if(!dragged||dragged.key!==key())return;e.preventDefault();e.stopPropagation();const target=dropSlotAt(e.clientX,e.clientY),id=dragged.id;cancelDrag();if(target)place(+target.dataset.slot,id);else feedback('Acerca la pieza a un hueco o a su línea resaltada. Sigue disponible para intentarlo.');});
root.addEventListener('dragend',()=>cancelDrag());
root.addEventListener('dragleave',e=>{const r=root.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)clearDropHighlight();});
root.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'&&e.pointerType!=='pen')return;const source=dragSource(e.target);if(source)touchDrag={...source,pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,moving:false};});
root.addEventListener('pointermove',e=>{if(!touchDrag||touchDrag.pointerId!==e.pointerId)return;if(touchDrag.key!==key()){cancelDrag();return;}if(!touchDrag.moving&&Math.hypot(e.clientX-touchDrag.startX,e.clientY-touchDrag.startY)<7)return;
 if(!touchDrag.moving){touchDrag.moving=true;root.setPointerCapture(e.pointerId);touchDrag.el.dataset.dragging='true';const ghost=document.createElement('div');ghost.className='p-drag-ghost';ghost.textContent=pieces().find(p=>p.id===touchDrag.id).text;ghost.setAttribute('aria-hidden','true');root.appendChild(ghost);}
 e.preventDefault();const b=root.getBoundingClientRect(),ghost=$('.p-drag-ghost');ghost.style.left=(e.clientX-b.left+12)+'px';ghost.style.top=(e.clientY-b.top+12)+'px';highlightDrop(dropSlotAt(e.clientX,e.clientY));
});
root.addEventListener('pointerup',e=>{if(!touchDrag||touchDrag.pointerId!==e.pointerId)return;const moving=touchDrag.moving,id=touchDrag.id,target=moving?dropSlotAt(e.clientX,e.clientY):null;if(moving){e.preventDefault();suppressClickUntil=performance.now()+400;if(root.hasPointerCapture(e.pointerId))root.releasePointerCapture(e.pointerId);}cancelDrag();if(target)place(+target.dataset.slot,id);});
root.addEventListener('pointercancel',e=>{if(touchDrag?.pointerId===e.pointerId)cancelDrag();});
root.addEventListener('click',e=>{if(e.detail!==0&&performance.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
function erValue(i){
 if(mode==='observe')return `<button type="button" class="cursor-interaction" data-er-focus="${i}" aria-label="Explicar ${esc(stage().cues[i].title)}">${esc(stage().cues[i].text)}</button>`;
 const v=answers[key()]?.[i],p=pieces().find(p=>p.id===v);
 return `<button type="button" class="p-slot cursor-interaction" data-slot="${i}" data-filled="${!!p}" aria-label="Hueco ${i+1}: ${esc(stage().cues[i].title)}">${p?esc(p.text):'⟦ '+(i+1)+' ⟧'}</button>`;
}
function drawErLines(){
 const board=$('[data-er-board]');if(!board||!isRelation())return;
 const owner=board.querySelector('[data-er-entity=huerto]'),child=board.querySelector('[data-er-entity=parcela]');
 const pk=owner.querySelector('[data-er-port=pk]'),fk=child.querySelector('[data-er-port=fk]');
 const b=board.getBoundingClientRect(),a=owner.getBoundingClientRect(),z=child.getBoundingClientRect(),p=pk.getBoundingClientRect(),q=fk.getBoundingClientRect();
 const stacked=z.top>a.bottom,one=board.querySelector('[data-er-one]'),many=board.querySelector('[data-er-many]');
 const x1=(stacked?a.left:a.right)-b.left,y1=p.top-b.top+p.height/2,x2=z.left-b.left,y2=q.top-b.top+q.height/2;
 const bend=stacked?16:(x1+x2)/2;
 const line=`M ${x1} ${y1} H ${bend} V ${y2} H ${x2}`;
 board.querySelector('.p-er-wires').innerHTML=`<path d="${line}"/><path d="M ${x1+(stacked?-8:8)} ${y1-5} V ${y1+5}"/><path d="M ${x2-12} ${y2} L ${x2} ${y2-6} M ${x2-12} ${y2} L ${x2} ${y2+6}"/><circle cx="${x2-20}" cy="${y2}" r="3.5"/>`;
 one.style.left=(stacked?19:x1+4)+'px';one.style.top=(y1-28)+'px';
 many.style.left=(stacked?18:x2-53)+'px';many.style.top=(y2-29)+'px';
}
function renderER(){
 $('[data-er-work]').innerHTML=`<div class="p-er-board" data-er-board role="group" aria-label="${esc(P.sql)}: uno. ${esc(N.sql)}: cero o muchos. La clave foránea es ${esc(C.foreignKey)}."><svg class="p-er-wires" aria-hidden="true"></svg><div class="p-er-card" data-er-entity="huerto"><table class="p-er-table"><caption>${esc(P.sql)}<small>Entidad principal</small></caption><tbody><tr><th data-er-port="pk" data-lit="${frame!==1}"><span class="p-er-field"><span class="p-er-tag">PK</span><span>ID</span></span></th></tr><tr><th>NOMBRE</th></tr></tbody></table></div><div class="p-er-card" data-er-entity="parcela"><table class="p-er-table"><caption>${esc(N.sql)}<small>Registro asociado</small></caption><tbody><tr><th><span class="p-er-field"><span class="p-er-tag">PK</span><span>ID</span></span></th></tr><tr><th>${esc(C.text.column)}</th></tr><tr><th>${esc(M.column)}</th></tr><tr><th data-er-port="fk" data-lit="${frame===2}"><span class="p-er-field"><span class="p-er-tag">FK</span><span>${erValue(2)}</span></span></th></tr></tbody></table></div><span class="p-er-cardinality" data-er-one data-active="${frame===0}">${erValue(0)}</span><span class="p-er-cardinality" data-er-many data-active="${frame===1}">${erValue(1)}</span></div><div class="p-er-caption"><b>Una relación 1:N</b><span>· la referencia se guarda en ${esc(N.sql)}</span></div><div class="p-er-help">PK · clave primaria &nbsp; FK · clave foránea</div>`;
 $$('[data-er-focus]').forEach(b=>b.onclick=()=>{stop();frame=+b.dataset.erFocus;renderCode();renderScene();controls();persist();});
 erObserver=new ResizeObserver(()=>{cancelAnimationFrame(erRaf);erRaf=requestAnimationFrame(drawErLines);});erObserver.observe($('[data-er-board]'));
 erRaf=requestAnimationFrame(drawErLines);
}
function renderCode(){
 erObserver?.disconnect();cancelAnimationFrame(erRaf);erObserver=null;
 $('[data-er-work]').hidden=!isRelation();$('[data-code]').hidden=isRelation();$('[data-full]').hidden=isRelation();
 if(isRelation()){
  $('[data-code]').innerHTML='';
  renderER();$('[data-dots]').innerHTML=stage().cues.map((c,i)=>`<button type="button" class="p-btn cursor-interaction" data-cue-index="${i}" aria-pressed="${i===frame}"${guidedExplanation&&i===frame?' aria-current="step"':''}>${i+1} · ${esc(['Lado uno','Lado muchos','La clave foránea'][i])}</button>`).join('');
  $$('[data-cue-index]').forEach(b=>b.onclick=()=>{stop();frame=+b.dataset.cueIndex;renderCode();renderScene();controls();persist();});bindSlots();renderBank();return;
 }
 $('[data-er-work]').innerHTML='';
 const s=stage(),ranges=marks(),active=ranges[Math.min(frame,ranges.length-1)];let lines=s.code.split('\n');
 let start=0,end=lines.length;if(!full){start=Math.max(0,active.line-4);end=Math.min(lines.length,Math.max(start+10,active.line+3));start=Math.max(0,end-12);}
 let offset=0;const html=lines.map((line,i)=>{const base=offset;offset+=line.length+1;const matches=ranges.filter(r=>r.start>=base&&r.start<base+line.length);let out='',last=0;
  for(const r of matches){out+=syntax(line.slice(last,r.start-base));if(mode==='build'){const v=answers[key()]?.[r.i],piece=pieces().find(p=>p.id===v);out+=`<button type="button" class="p-slot cursor-interaction" data-slot="${r.i}" data-filled="${!!piece}" aria-label="Hueco ${r.i+1}: ${esc(s.cues[r.i].title)}">${piece?esc(piece.text):'⟦ Pieza '+(r.i+1)+' ⟧'}</button>`;}else out+=syntax(line.slice(r.start-base,r.end-base));last=r.end-base;}
  out+=syntax(line.slice(last));return i>=start&&i<end?`<span class="p-line" data-line="${i+1}" data-active="${mode==='observe'&&i+1===active.line}">${out||'&nbsp;'}</span>`:'';}).join('');
 $('[data-code]').innerHTML=html;$('[data-full]').textContent=full?'Volver al fragmento':'Ver archivo completo';
 $('[data-dots]').innerHTML=`${s.cues.map((c,i)=>`<button type="button" class="p-btn cursor-interaction" data-cue-index="${i}" aria-label="Explicación ${i+1}: ${esc(c.title)}" aria-pressed="${i===frame}"${guidedExplanation&&i===frame?' aria-current="step"':''}>${i+1}${pieceMatches(s,i,answers[key()]?.[i])?' ✓':''}</button>`).join('')}<span>${mode==='build'?'Huecos del archivo':`líneas ${start+1}–${end}`}</span>`;
 $$('[data-cue-index]').forEach(b=>b.onclick=()=>{stop();frame=+b.dataset.cueIndex;renderCode();renderScene();controls();persist();});
 bindSlots();
 renderBank();
}
function plotData(after=false){let plots=D.fixtures.map(x=>({...x}));const c=stage().chapter;if((c===1&&after)||(c===2&&!after))plots.push({id:10,name:C.createName,value:M.create,parent:2});if(c>=3&&(c>3||after))plots.find(x=>x.id===7).value=M.after;if(c>=4&&(c>4||after))plots.find(x=>x.id===7).parent=2;return plots;}
function garden(plots,focus=7){return `<div class="p-gardens">${[1,2].map(h=>`<div class="p-garden"><strong>${esc(P.entity)} ${h}</strong>${plots.filter(p=>p.parent===h).map(p=>`<div class="p-plot" data-focus="${p.id===focus}"><span class="p-record-mark" aria-hidden="true"></span><span>${p.id} · ${esc(p.name)}<br>${esc(p.value)} ${esc(M.unit)}</span></div>`).join('')}</div>`).join('')}</div>`;}
function fieldInventory(technology){
 const count=D.fieldGuide.entities.reduce((n,e)=>n+e.fields.length,0);
 return `<div class="p-schema-inventory" data-field-inventory="${technology}"><div class="p-schema-heading"><b>Todos los campos del ER</b><span>${count} campos · pulsa uno para ver su declaración</span></div><div class="p-schema-tables">${D.fieldGuide.entities.map(entity=>`<section class="p-schema-table" data-field-entity="${esc(entity.name)}"><header><strong>${esc(technology==='cloud'?entity.dynamo:entity.sql)}</strong><small>${entity.fields.length} campos · ${technology==='cloud'?'Entity de Toolbox':'Entity de TypeORM'}</small></header>${entity.fields.map(field=>{
 const source=field[technology],active=track===technology&&index===source.step&&frame===source.cue,role=field.role==='key'?'PK':field.role==='reference'?(technology==='cloud'?'REF':'FK'):'DATO';
 return `<button type="button" class="p-schema-field" data-schema-field="${esc(entity.name+':'+field.er)}" data-field-step="${source.step}" data-field-cue="${source.cue}" data-field-role="${field.role}" data-field-active="${active}" title="Ver dónde se declara ${esc(source.column)} · Ejemplo: ${esc(field.example)}" aria-label="${esc(entity.name+': '+field.er+' → '+source.column+'. Ver declaración')}"><span class="p-schema-badge">${role}</span><span class="p-schema-property"><code>${esc(source.property)}</code><small>${esc(source.type)}</small></span><span class="p-schema-arrow" aria-hidden="true">→</span><span class="p-schema-column"><code>${esc(source.column)}</code></span></button>`;
 }).join('')}</section>`).join('')}</div></div>`;
}
function cloudSchemaDiagram(){
 const scene=stage().scene,keysVisible=scene==='index'||scene==='table';
 const process=`<nav class="p-schema-process" aria-label="Dónde se define cada parte">${[['1','YAML','Crea tablas',1,'index'],['2','Table','Cliente y claves',2,'table'],['3','Entity','Todos los atributos',3,'entity']].map(([n,title,note,step,role])=>`<button type="button" data-model-step="${step}" data-active="${scene===role}"><b>${n} · ${title}</b><small>${note}</small></button>`).join('<span aria-hidden="true">→</span>')}</nav>`;
 const keys=`<div class="p-schema-keys"><div><b>${esc(P.table)}</b><code>PK · ${esc(P.sql)}_ID</code><small>Lectura por su ID → registro con NOMBRE</small><small>Table · sin sort key</small></div><div><b>${esc(N.table)}</b><code>PK · ${esc(N.sql)}_ID</code><small>Table · sin sort key</small></div></div><div class="p-schema-index"><b>GSI ${esc(C.index)} · otra estructura de consulta</b><small>Consulta: ${esc(N.route)} de ${esc(P.entity)} 1</small><code>PK · ${esc(P.sql)}_ID → SK · ${esc(N.sql)}_ID</code><small>INCLUDE · claves automáticas + ${esc(C.text.column)} + ${esc(M.column)}</small></div>`;
 const where=`<div class="p-schema-explain"><strong>Los datos normales se configuran en Entity</strong><span><code>AttributeDefinitions</code> declara las claves de tabla e índices. <code>${esc(C.text.column)}</code> y <code>${esc(M.column)}</code> tienen su tipo en <code>schema: item(...)</code> y se guardan con el ítem.</span><a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-dynamodb-table.html#cfn-dynamodb-table-attributedefinitions" target="_blank" rel="noopener">Ver la regla de AWS ↗</a></div>`;
 return `<div class="p-schema-guide">${process}${keysVisible?keys:''}${fieldInventory('cloud')}${scene==='index'||scene==='entity'?where:''}<div class="p-schema-reference"><code>${esc(C.foreignKey)} en SQL → ${esc(P.sql)}_ID en DynamoDB</code><small>En DynamoDB es una referencia guardada; no una foreign key comprobada entre tablas.</small></div><div class="p-schema-repository"><code>Ref → process.env → Table(documentClient: db)</code><span>Repository → Entity.build(EntityRepository) → método</span><button type="button" class="p-btn" data-model-step="4">Usar todos los atributos en Repository →</button></div>${modelReturn!==null?'<button type="button" class="p-btn" data-model-return>Volver al archivo que estabas leyendo →</button>':''}</div>`;
}
function nestSchemaDiagram(){
 return `<div class="p-schema-guide"><div class="p-schema-process p-schema-read"><span>ER · los campos</span><span aria-hidden="true">→</span><span>Entity · decoradores</span><span aria-hidden="true">→</span><span>PostgreSQL · columnas</span></div>${fieldInventory('nest')}<div class="p-nest-fk"><b>La relación también queda declarada</b><code>${esc(N.sql)}.${esc(C.foreignKey)} → ${esc(P.sql)}.ID</code><small>@ManyToOne + @JoinColumn guardan la FK.</small></div><div class="p-schema-explain"><strong><code>${esc(N.inverse)}: ${esc(N.entity)}[]</code> es la colección inversa</strong><span><code>@OneToMany</code> permite recorrer los registros de ${esc(N.entity)} desde ${esc(P.entity)}. No añade otra columna a ${esc(P.sql)}.</span></div><div class="p-modebar"><button type="button" class="p-btn" data-nest-step="4">Registrar las dos Entities →</button><button type="button" class="p-btn" data-nest-step="5">${simpleNest?'Conectar el Service':'Usarlas en Repository'} →</button></div>${entityReturn!==null?'<button type="button" class="p-btn" data-entity-return>Volver al caso de uso que estabas leyendo →</button>':''}</div>`;
}
function modelDiagram(){
 if(schemaGuide)return cloudSchemaDiagram();
 const s=stage(),binding=s.scene==='binding',scan=binding&&frame>=4;
 return `<div class="p-models"><div class="p-model-label">PREPARAR · ${esc(C.modelFile)}</div><div class="p-transport">serverless.yml crea ${esc(N.table)} en AWS<br>Ref → variable ${esc(N.variable)} de Lambda</div><div class="p-model-pair"><div class="p-model-node" data-active="${s.scene==='table'}"><header><button type="button" class="cursor-interaction" data-model-step="2">① Table</button></header><code>${esc(N.variable)}<br>name: tabla real<br>documentClient: db<br>PK: ${esc(N.sql)}_ID<br>GSI: ${esc(C.index)}</code><small>Destino · claves · cliente</small></div><div class="p-model-wire">→</div><div class="p-model-node" data-active="${s.scene==='entity'||binding}"><header><button type="button" class="cursor-interaction" data-model-step="3">② Entity</button></header><code>${esc(N.model)}<br>table: ${esc(N.variable)}<br>schema: item(...)</code><small>Tipos · clave · nombres guardados</small></div></div><div class="p-model-node" data-active="${s.scene==='entity'}"><div class="p-model-map"><span>${esc(N.input)}<br>${esc(M.property)}</span><b>→</b><span>${esc(N.sql)}_ID<br>${esc(M.column)}</span></div><small>.savedAs() · traduce al guardar y al leer</small></div><div class="p-model-wire">↓ <span class="p-model-label">import desde el repository</span></div><div class="p-model-node" data-active="${binding}"><header><button type="button" class="cursor-interaction" data-model-step="4">③ Repository</button></header><code>${esc(N.model)}.build(EntityRepository)<br>  ${scan?'.scan({ consistent: true })':'.put('+esc(N.property)+')'}</code><small>El método envía la operación; no lleva .send().</small></div><div class="p-db">DynamoDB · ${esc(N.table)}</div>${modelReturn!==null?'<button type="button" class="p-btn cursor-interaction" data-model-return>Volver al archivo que estabas leyendo →</button>':''}</div>`;
}
function modelUse(){const c=stage().chapter;const access=model=>esc(model)+'.build(EntityRepository)';const method=c===1?'put / scan':c===2?'delete':'update';return `<div class="p-model-use"><span class="p-model-label">EL REPOSITORY OPERA DESDE LA ENTITY</span><code>${c===5?access(P.model)+'.get({ '+esc(P.input)+' })<br>'+access(N.model)+".query({ index: '"+esc(C.index)+"', partition: "+esc(P.input)+' })':access(N.model)+'<br>→ '+method}</code><small>get, put, scan, query, update y delete envían su operación. No añadimos .send().</small><button type="button" class="p-btn cursor-interaction" data-model-review>Revisar Table y Entity ↗</button></div>`;}

function nestDiagram(){
 const s=stage(),relation=s.scene==='nest-relation',module=s.scene==='nest-module',binding=s.scene==='nest-binding';
 if(schemaGuide&&!module&&!binding)return nestSchemaDiagram();
 const route=`<div class="p-nest-route"><span data-active="${!module&&!binding}">Entities</span>→<span data-active="${module}">forFeature</span>→<span data-active="${binding}">InjectRepository</span>→<span>Consulta / escritura</span></div>`;
 let content='';
 if(!module&&!binding){
  content=`<div class="p-nest-entities"><div class="p-model-node" data-active="${s.scene==='nest-parent'||relation}"><header><button type="button" class="cursor-interaction" data-nest-step="1">${esc(P.entity)} · Entity</button></header><code>id: number → ID<br>nombre: string → NOMBRE</code><small>@Entity → ${esc(P.sql)}</small><code>${esc(N.inverse)}: ${esc(N.entity)}[]</code><small>@OneToMany · lado inverso</small></div><div class="p-nest-link"><span>1</span><b></b><span>0..N</span></div><div class="p-model-node" data-active="${s.scene==='nest-child'||relation}"><header><button type="button" class="cursor-interaction" data-nest-step="2">${esc(N.entity)} · Entity</button></header><code>id → ID<br>${esc(C.text.property)} → ${esc(C.text.column)}<br>${esc(M.property)} → ${esc(M.column)}<br>${esc(P.property)}: ${esc(P.entity)}</code><small>@Entity → ${esc(N.sql)}</small><small>@ManyToOne · guarda la FK</small></div></div><div class="p-nest-fk">@JoinColumn({ name: '${esc(C.foreignKey)}' })<br>${esc(N.sql)}.${esc(C.foreignKey)} → ${esc(P.sql)}.ID</div><div class="p-model-label">${esc(P.entity)}.${esc(N.inverse)} ↔ ${esc(N.entity)}.${esc(P.property)}</div><button type="button" class="p-btn cursor-interaction" data-nest-step="3">Ver cómo se relacionan las dos Entities →</button>`;
 }else if(module){
  content=`<div class="p-model-pair"><div class="p-model-node"><header>${esc(P.entity)}</header><code>${esc(P.file.split('/').at(-1))}</code></div><div class="p-model-wire">+</div><div class="p-model-node"><header>${esc(N.entity)}</header><code>${esc(N.file.split('/').at(-1))}</code></div></div><div class="p-model-wire">↓</div><div class="p-model-node" data-active="true"><header>${D.projectBase?'ObrasModule':'TallerModule'} · imports</header><code>TypeOrmModule.forFeature(<br>  [${esc(P.entity)}, ${esc(N.entity)}]<br>)</code><small>Registra los providers de TypeORM en este módulo</small></div><div class="p-model-wire">↓</div><div class="p-model-pair"><div class="p-model-node"><header>Repository&lt;${esc(P.entity)}&gt;</header><small>Operaciones sobre ${esc(P.sql)}</small></div><div class="p-model-wire">+</div><div class="p-model-node"><header>Repository&lt;${esc(N.entity)}&gt;</header><small>Operaciones sobre ${esc(N.sql)}</small></div></div>`;
 }else{
  content=`<div class="p-model-node"><header><button type="button" class="cursor-interaction" data-nest-step="2">${esc(N.entity)} · Entity ya preparada</button></header><code>${esc(C.text.property)} → ${esc(C.text.column)}<br>${esc(M.property)} → ${esc(M.column)}<br>${esc(P.property)}.id → ${esc(C.foreignKey)}</code></div><div class="p-model-wire">↓</div><div class="p-model-node" data-active="true"><header>${simpleNest?esc(N.route[0].toUpperCase()+N.route.slice(1)+'Service · un único Service'):'CrearListarRepository · nuestra clase'}</header><code>@InjectRepository(${esc(N.entity)})<br>${esc(N.route)}: Repository&lt;${esc(N.entity)}&gt;</code><small>Nest entrega el repositorio de TypeORM de esa Entity</small></div><div class="p-model-map"><span>create(...)<br>objeto en memoria</span><b>→</b><span>save(...)<br>fila guardada</span></div><div class="p-nest-fk">${esc(P.property)}: { id: 2 }<br>↓<br>${esc(N.sql)}.${esc(C.foreignKey)} = 2</div><div class="p-db">PostgreSQL · ${esc(N.sql)}</div>`;
 }
 return `<div class="p-nest-guide">${route}${content}<div class="p-modebar"><button type="button" class="p-btn cursor-interaction" data-nest-step="4">Registrar las Entities ↗</button><button type="button" class="p-btn cursor-interaction" data-nest-step="5">${simpleNest?'Conectar el Service':'Usarlas en Repository'} ↗</button></div>${entityReturn!==null?'<button type="button" class="p-btn cursor-interaction" data-entity-return>Volver al caso de uso que estabas leyendo →</button>':''}</div>`;
}
function nestUse(){return `<div class="p-model-use"><span class="p-model-label">${simpleNest?'EL SERVICE UTILIZA LAS ENTITIES':'ESTE REPOSITORY UTILIZA LAS ENTITIES'}</span><code>${stage().chapter===5?'@InjectRepository('+esc(P.entity)+') → Repository&lt;'+esc(P.entity)+'&gt;<br>':''}@InjectRepository(${esc(N.entity)}) → Repository&lt;${esc(N.entity)}&gt;</code><button type="button" class="p-btn cursor-interaction" data-entity-review>Revisar Entities y relación ↗</button></div>`;}
function renderScene(){
const s=stage(),cue=s.cues[frame],c=s.chapter,after=(s.name==='Repository'||(simpleNest&&track==='nest'&&s.name==='Service')||s.scene==='result')&&(solved.has(key())||(mode==='observe'&&frame===s.cues.length-1)),isCloud=track==='cloud';
let html='';
if(isRelation()){
 html=`<div class="p-er-example"><div class="p-er-example-head">La misma relación, con datos</div><div class="p-er-owner"><div><b>${esc(P.examples[0])}</b><small>${esc(P.sql)}</small></div><span class="p-er-id">ID = 1</span></div><div class="p-er-fan" aria-hidden="true"></div><div class="p-er-children">${D.fixtures.filter(p=>p.parent===1).map(p=>`<div class="p-er-child" data-lit="${frame===1}"><b>${esc(p.name)}</b><small>PK · ID = ${p.id}</small><span class="p-er-fk-value">${mode==='build'?'FK':esc(C.foreignKey)} = 1</span></div>`).join('')}</div><p class="p-er-example-note">Dos IDs distintos, <b>7 y 9</b>. La misma referencia al <b>ID 1 de ${esc(P.entity)}</b>.</p></div>`;
}else if(!isCloud&&s.scene.startsWith('nest-')){
 html=nestDiagram();
}else if(isCloud&&['table','entity','binding'].includes(s.scene)){
 html=modelDiagram();
}else if(s.scene==='index'&&isCloud){
 html=schemaGuide?cloudSchemaDiagram():`<div class="p-index-map"><div class="p-index-box"><b>${esc(N.table)} · tabla</b><code>PK: ${esc(N.sql)}_ID</code><code>SK: no tiene</code></div><span class="p-index-arrow">→</span><div class="p-index-box"><b>${esc(C.index)} · GSI</b><code>PK: ${esc(P.sql)}_ID</code><code>SK: ${esc(N.sql)}_ID</code></div></div><div class="p-connection">INCLUDE → ${esc(C.text.column)} + ${esc(M.column)}</div>${garden(plotData(c===5))}`;
}else if(s.scene==='result'){
 const rows=plotData(after),op=D.operations[c-1];html=`<div class="p-transport">${esc(op.request)}</div><div>${rows.map(p=>`<div class="p-result-row" data-muted="${c===5&&!(p.parent===2&&p.value>=M.minimum)}" data-hit="${p.id===(c<3?10:7)}"><span>${p.id} · ${esc(p.name)}</span><span>${esc(p.value)} ${esc(M.unit)} · ${esc(P.entity)} ${p.parent}</span></div>`).join('')}</div><div class="p-return">${esc(op.result)}</div>`;
}else{
 const op=D.operations[c-1],part=s.name==='Repository'?2:s.name==='Service'?1:0;
 html=`${op?`<div class="p-transport">${esc(op.request)}</div>`:'<div class="p-transport">Petición HTTP → entrada de la aplicación</div>'}<div class="p-connection">${isCloud?'serverless.yml → API Gateway → Lambda':'Módulo Nest → ruta del controller'}</div><div class="p-flow">${(simpleNest&&!isCloud?['Controller','Service','Entity / TypeORM']:[isCloud?'Handler':'Controller','Service','Repository']).map((n,i)=>`<div class="p-layer" data-lit="${i===part}"><b>${n}</b><small>${['recibe','coordina','persiste'][i]}</small></div>`).join('')}</div><div class="p-connection">↓ parámetros &nbsp; · &nbsp; resultado ↑</div><div class="p-db">${isCloud?'DynamoDB · Toolbox':'PostgreSQL · TypeORM'}</div>${c?garden(plotData(after),c<3?10:7):''}`;
}
if(isCloud&&c>0&&s.name==='Repository')html+=modelUse();
if(!isCloud&&c>0&&(s.name==='Repository'||(simpleNest&&s.name==='Service')))html+=nestUse();
$('[data-scene]').innerHTML=html;$('[data-cue]').innerHTML=`${guidedExplanation&&mode==='observe'?`<span class="p-explanation-label">Explicación ${frame+1} de ${s.cues.length}</span>`:''}<b>${esc(cue.title)}</b><p>${esc(cue.note)}</p>${mode==='observe'?`<code>${esc(cue.text)}</code>`:''}`;
$$('[data-model-step]').forEach(b=>b.onclick=()=>go(+b.dataset.modelStep));
$$('[data-schema-field]').forEach(button=>button.onclick=()=>{
 stop();index=Number(button.dataset.fieldStep);frame=Number(button.dataset.fieldCue);mode='observe';full=false;selected=null;render();
 feedback('La línea resaltada declara este campo. Sigue la explicación o selecciona otro atributo.');persist();
});
const review=$('[data-model-review]');if(review)review.onclick=()=>{modelReturn=index;go(2);};
const back=$('[data-model-return]');if(back)back.onclick=()=>{const target=modelReturn;modelReturn=null;go(target);};
$$('[data-nest-step]').forEach(b=>b.onclick=()=>go(+b.dataset.nestStep));
const entities=$('[data-entity-review]');if(entities)entities.onclick=()=>{entityReturn=index;go(1);};
const entityBack=$('[data-entity-return]');if(entityBack)entityBack.onclick=()=>{const target=entityReturn;entityReturn=null;go(target);};
}
function renderNav(){
const list=D.steps[track],s=stage();
$('[data-chapters]').innerHTML=D.chapters.map((name,ch)=>{const group=list.filter(x=>x.chapter===ch),done=group.every(x=>solved.has(track+':'+list.indexOf(x)));return `<button type="button" class="p-chapter cursor-interaction" data-ch="${ch}" aria-current="${s.chapter===ch?'step':'false'}" data-done="${done}"><b><span>${ch+1}</span></b><span>${esc(name)}</span></button>`;}).join('');
$('[data-files]').innerHTML=list.map((s2,i)=>s2.chapter===s.chapter?`<button type="button" class="cursor-interaction" data-file="${i}" aria-current="${i===index?'step':'false'}" data-done="${solved.has(track+':'+i)}">${list.filter((x,j)=>x.chapter===s.chapter&&j<=i).length}. ${esc(s2.name)}</button>`:'').join('');
if(s.chapter>0)$('[data-files]').insertAdjacentHTML('beforeend',`<button type="button" class="p-preparation-link cursor-interaction" data-preparation>${track==='nest'?'Entities y relaciones':'Table y Entity'} ↗</button>`);
$$('[data-ch]').forEach(b=>b.onclick=()=>go(list.findIndex(s=>s.chapter===+b.dataset.ch)));$$('[data-file]').forEach(b=>b.onclick=()=>go(+b.dataset.file));
$$('[data-tech]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tech===track)));
const preparation=$('[data-preparation]');if(preparation)preparation.onclick=()=>{if(track==='nest'){entityReturn=index;go(1);}else{modelReturn=index;go(2);}};
}
function renderBank(){
 $('[data-bank-wrap]').hidden=mode!=='build';const used=new Set(Object.values(answers[key()]||{})),visible=new Set($$('[data-slot]').map(el=>el.dataset.slot)),remaining=stage().cues.length-used.size;
 const available=pieces().filter(p=>visible.has(p.id)&&!used.has(p.id));
 $('[data-bank-label]').textContent=remaining===0?'Todas las piezas están colocadas. Pulsa «Comprobar las piezas».':`${available.length} ${available.length===1?'pieza disponible':'piezas disponibles'} en este fragmento · ${remaining} por colocar en el apartado.`;
 $('[data-bank]').innerHTML=available.length?available.map(p=>`<button type="button" class="p-piece" draggable="true" data-piece="${p.id}" aria-pressed="${selected===p.id}">${esc(p.text)}</button>`).join(''):`<span class="p-bank-status">${remaining?'Continúa con los números bajo el código para colocar las siguientes.':'Puedes mover una pieza colocada si quieres cambiarla.'}</span>`;
 $$('[data-piece]').forEach(b=>b.onclick=()=>{selected=b.dataset.piece;renderBank();feedback('Pieza seleccionada. Pulsa el hueco donde debe ir.');});
}
function syncExplanationProgress(){
 if(!guidedExplanation)return;
 const s=stage(),total=s.cues.length;
 $$('[data-cue-index]').forEach(button=>{
  if(Number(button.dataset.cueIndex)===frame)button.setAttribute('aria-current','step');
  else button.removeAttribute('aria-current');
 });
 const label=$('[data-mode]');
 label.setAttribute('role','status');label.setAttribute('aria-live','polite');label.setAttribute('aria-atomic','true');
 label.toggleAttribute('data-explanation-position',mode==='observe');
 if(mode==='observe'){
  label.textContent=`Explicación ${frame+1} de ${total} · ${s.cues[frame].title}`;
  $('[data-frame]').textContent=frame===total-1?(total===1?'Repetir explicación ↻':'Volver a explicación 1 ↻'):`Siguiente explicación · ${frame+2} de ${total} →`;
 }
}
function controls(){const s=stage();$('[data-play]').textContent=playing?'Pausar animación':mode==='build'?'Volver a observar':'Ver animación';$('[data-frame]').hidden=mode==='build';$('[data-build]').hidden=mode==='build';$('[data-check]').hidden=mode!=='build';$('[data-mode]').textContent=mode==='build'?'Monta el archivo. El dibujo te acompaña.':playing?'Sigue la pieza que entra en el archivo.':'Observa o avanza a tu ritmo.';$('[data-next]').disabled=!solved.has(key())||index===D.steps[track].length-1;$('[data-back]').disabled=index===0;$('[data-progress]').textContent=`${D.steps[track].filter((_,i)=>solved.has(track+':'+i)).length} / ${D.steps[track].length} pasos`;$('[data-title]').textContent=s.name;$('[data-meta]').textContent=`${D.source.label}${D.source.kind==='pdf'?' · página '+s.page:''} · ${s.entityAccess?'acceso uniforme con EntityRepository':s.exact?(s.annotated?'modelo de la ficha · comentado':'modelo de la ficha'):'aplicación guiada'} · ${mode==='observe'?'1 · Observar':'2 · Construir'}`;$('[data-path]').textContent=s.path;syncExplanationProgress();}
function renderPractice(){
 if(!D.practice)return;
 let host=$('[data-practice]');
 if(!host){host=document.createElement('section');host.className='p-practice';host.setAttribute('data-practice','');$('.p-bottom').before(host);}
 const s=stage(),lastModel=D.steps[track].filter(x=>x.chapter===0).at(-1),models=s===lastModel;
 host.hidden=!models&&s.scene!=='result';
 if(host.hidden)return;
 if(host.dataset.stage===key())return;
 host.dataset.stage=key();
 const phases=D.practice[track],phase=phases.find(x=>x.id===(models?'modelos':'caso-'+s.chapter));
 if(!phase){host.hidden=true;return;}
 let blocks;
 if(models){
  const studied=new Set(D.steps[track].filter(x=>x.chapter===0).map(x=>x.path));
  const connection=phases.find(x=>x.id==='conexion');
  const additions=track==='nest'?(connection?.blocks.filter(b=>b.path==='src/salud.controller.ts'||b.kind==='instruction')||[]):[];
  const url=track==='cloud'?phases.find(x=>x.id==='desplegar')?.blocks.filter(b=>b.title==='Obtén la URL del stack')||[]:[];
  blocks=[...additions,...phase.blocks.filter(b=>b.kind!=='file'||!studied.has(b.path)),...url,...phases.find(x=>x.id==='datos').blocks];
 }else{
  // Los archivos de las capas se estudian arriba. El YAML acumulativo permite desplegar cada caso.
  blocks=phase.blocks.filter(b=>b.kind!=='file'||b.path==='serverless.yml');
 }
 const copies=[];
 const codeBox=(code,label)=>{const id=copies.push(code)-1;return `<div class="p-practice-code"><div><span>${esc(label)}</span><button type="button" class="p-btn" data-practice-copy="${id}">Copiar</button></div><pre tabindex="0"><code>${esc(code)}</code></pre></div>`;};
 const content=blocks.map(b=>{
  const instructions=b.instructions?.length?`<ol>${b.instructions.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:'';
  const create=b.kind==='file'&&b.create?codeBox(b.create,'Crea o abre el archivo'):'';
  const code=b.code?codeBox(b.code,b.kind==='file'?'Contenido completo · guarda el archivo':'Ejecuta en tu terminal'):'';
  const explanation=(b.explain||'').replace(' PostgreSQL genera el ID en Nest; Serverless usa Date.now en el service. Scan no garantiza el orden del listado.',track==='nest'?' PostgreSQL genera el ID mediante @PrimaryGeneratedColumn.':' El Service genera el ID con Date.now. Scan no garantiza el orden del listado.');
  const inner=instructions+create+code+(explanation?`<p>${esc(explanation)}</p>`:'');
  return b.kind==='file'?`<details class="p-practice-block"><summary>${esc(b.path)}</summary>${inner}</details>`:`<section class="p-practice-block"><h3>${esc(b.title)}</h3>${inner}</section>`;
 }).join('');
 host.innerHTML=`<header><span class="p-label">EN TU PROYECTO · ${track==='nest'?'NEST + TYPEORM':'SERVERLESS + TOOLBOX'}</span><h2>${models?'Aplica el modelo y prepara los datos':'Prueba este caso desde tu terminal'}</h2><p>${models?'Continúa en el backend que ya preparaste siguiendo su README. Los archivos de las Entities y las capas están arriba; aquí tienes su conexión con la aplicación y los datos de ejemplo.':track==='nest'?'Guarda los archivos del caso y mantén Nest abierto en Terminal 1. Ejecuta las pruebas en Terminal 2, dentro de backend. Sigue los casos en orden; conserva el ID devuelto al crear.':'Guarda los archivos del caso. Usa la sesión AWS y API_URL de tu proyecto; estos comandos se ejecutan en su terminal. Sigue los casos en orden y conserva el ID devuelto al crear.'}</p></header>${content}<div class="p-practice-expect"><strong>Qué debes comprobar</strong><p>${esc(models?phases.find(x=>x.id==='datos').expect:phase.expect)}</p><small>El cuaderno explica y copia los comandos. Las peticiones se ejecutan en tu terminal y las respuestas las devuelve tu backend.</small></div>`;
 host.querySelectorAll('[data-practice-copy]').forEach(button=>button.onclick=async()=>{
  try{await navigator.clipboard.writeText(copies[Number(button.dataset.practiceCopy)]);button.textContent='Copiado';}
  catch{button.textContent='Selecciona el código';}
 });
}

function render(){renderNav();renderCode();renderScene();controls();renderPractice();}
function go(i){stop();index=i;frame=0;mode='observe';full=false;selected=null;render();feedback('Observa este archivo y después completa sus piezas.');persist();}
function fly(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const a=$('[data-cue] code'),b=isRelation()?$(`[data-er-focus="${frame}"]`):$('[data-code] .p-line[data-active=true]');if(!a||!b)return;const r=root.getBoundingClientRect(),ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),el=document.createElement('span');el.className='p-fly';el.textContent=stage().cues[frame].text;el.style.left=(ar.left-r.left)+'px';el.style.top=(ar.top-r.top)+'px';root.appendChild(el);const animation=el.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${br.left-ar.left+(isRelation()?0:32)}px,${br.top-ar.top}px)`,opacity:.25}],{duration:850,easing:'cubic-bezier(.4,0,.2,1)'});animation.onfinish=()=>el.remove();}
function playTick(){render();fly();timer=setTimeout(()=>{if(!playing)return;if(frame<stage().cues.length-1){frame++;playTick();}else{observed.add(key());stop();controls();feedback('Ya has visto el archivo. Pulsa «Ahora lo monto yo».','good');persist();}},2400);}
$('[data-play]').onclick=()=>{if(playing){stop();controls();persist();return;}mode='observe';if(frame===stage().cues.length-1)frame=0;playing=true;playTick();};
$('[data-frame]').onclick=()=>{stop();if(frame<stage().cues.length-1)frame++;else frame=0;if(frame===stage().cues.length-1)observed.add(key());render();fly();persist();};
$('[data-build]').onclick=()=>{stop();mode='build';full=false;frame=0;selected=null;render();feedback('Coloca las piezas. Los números bajo el código te llevan a cada hueco.');persist();};
$('[data-full]').onclick=()=>{full=!full;renderCode();persist();};
function place(slot,id){
 if(mode!=='build'||!Number.isInteger(slot)||slot<0||slot>=stage().cues.length||!pieces().some(p=>p.id===id))return;
 cancelDrag();const a=answers[key()]??={},previous=Object.keys(a).find(s=>a[s]===id),displaced=a[slot];
 if(previous!==undefined&&Number(previous)!==slot){if(displaced!==undefined)a[previous]=displaced;else delete a[previous];}
 a[slot]=id;solved.delete(key());frame=slot;selected=null;renderCode();renderScene();renderNav();controls();
 const target=$(`[data-slot="${slot}"]`);if(target&&!matchMedia('(prefers-reduced-motion: reduce)').matches)target.animate([{transform:'scale(.96)',background:'var(--p-lime)'},{transform:'scale(1)',background:'var(--p-lime)'}],{duration:180,easing:'ease-out'});
 feedback('Pieza encajada. Se ha retirado del banco; puedes moverla o comprobar el montaje.','good');persist();
}
$('[data-check]').onclick=()=>{const s=stage(),a=answers[key()]||{},bad=s.cues.findIndex((_,i)=>!pieceMatches(s,i,a[i]));if(bad>=0){frame=bad;renderCode();renderScene();const slot=$(`[data-slot="${bad}"]`);if(slot)slot.dataset.bad=true;feedback(`Revisa la pieza ${bad+1}: ${s.cues[bad].note}`,'error');return;}
solved.add(key());$$('[data-slot]').forEach(x=>x.dataset.good=true);renderScene();renderNav();controls();$('[data-scene]').classList.remove('p-breathe');void $('[data-scene]').offsetWidth;$('[data-scene]').classList.add('p-breathe');feedback(index===D.steps[track].length-1?'Recorrido completado. Cambia de tecnología y compara el mismo caso.':'Archivo correcto. Sigue con el siguiente y conserva el recorrido.','good');persist();};
$('[data-next]').onclick=()=>{if(!solved.has(key()))return;if(index<D.steps[track].length-1)go(index+1);};$('[data-back]').onclick=()=>{if(index>0)go(index-1);};
$$('[data-tech]').forEach(b=>b.onclick=()=>{stop();const chapter=stage().chapter;track=b.dataset.tech;index=D.steps[track].findIndex(s=>s.chapter===chapter);frame=0;mode='observe';full=false;selected=null;render();feedback('Mismo caso y mismos datos. Ahora mira qué archivos cambian.');persist();});
$('[data-context-title]').textContent=(D.source.kind==='teacher'?'Ejemplo docente':D.source.label)+' · '+C.title;
$('[data-context-footer]').textContent='Observa y monta el código de tu ficha. Prueba las operaciones en tu proyecto.';
document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();controls();persist();}});
window.addEventListener('pagehide',()=>{stop();erObserver?.disconnect();persist();});
render();
return {
 tecnologia: () => track,
 ir: (technology, file) => {
  if (!['nest','cloud'].includes(technology) || !Number.isInteger(file) || !D.steps[technology][file]) return;
  track=technology; go(file);
 }
};
}
