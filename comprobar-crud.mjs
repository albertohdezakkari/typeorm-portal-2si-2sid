/** Ejecuta curl contra el backend local arrancado por el alumno. No ejecuta código del repositorio. */
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID, createHash } from 'node:crypto';

export async function comprobar(c, options={}) {
  const base=options.api||'http://localhost:3000';
  const url=new URL(base);
  if(url.protocol!=='http:'||!['localhost','127.0.0.1','[::1]'].includes(url.hostname)||url.username||url.password)throw Error('Usa una API local http://localhost:PUERTO');
  const report={format:'crud-trace-v1',caseId:c.caseId,context:c,startedAt:new Date().toISOString(),timezone:'Europe/Madrid',origin:'curl ejecutado en equipo del alumno; evidencia aportada pendiente de revisión docente',cases:[],join:null,cleanup:[]};
  const prefix='Aula-'+randomUUID().slice(0,8),parents=new Set();let current=null;
  const fail=message=>{throw Error(message)};
  const assert=(ok,message)=>{if(!ok)fail(message)};
  const request=async(method,path,body)=>{
    const args=['--silent','--show-error','--max-time','15','--request',method,base.replace(/\/$/,'')+path];
    if(body!==undefined)args.push('--header','Content-Type: application/json','--data-raw',JSON.stringify(body));
    args.push('--write-out','\n%{http_code}');
    const raw=spawnSync('curl',args,{encoding:'utf8',maxBuffer:4*1024*1024});
    const entry={method,path,request:body??null,status:null,response:null};
    if(raw.error||raw.status!==0){entry.error=raw.error?.message||raw.stderr||'curl no disponible';(current?.requests||report.cleanup).push(entry);fail('No se pudo completar curl: '+entry.error)}
    const cut=raw.stdout.lastIndexOf('\n');entry.status=Number(raw.stdout.slice(cut+1));
    const text=raw.stdout.slice(0,cut);try{entry.response=JSON.parse(text)}catch{entry.response=text}
    (current?.requests||report.cleanup).push(entry);
    assert(entry.status>=200&&entry.status<300,`${method} ${path}: HTTP ${entry.status}`);
    return entry.response;
  };
  const list=async path=>{const rows=await request('GET',path);assert(Array.isArray(rows),'GET debe devolver un array');return rows};
  const idOf=x=>Number(x?.id??x?.ID??x?.identifiers?.[0]?.id??x?.raw?.[0]?.ID??x?.raw?.[0]?.id);
  const createParent=async name=>{const x=await request('POST','/'+c.parentRoute,{nombre:name});const id=idOf(x);assert(Number.isSafeInteger(id)&&id>0,'POST no devuelve ID reconocible');assert(!initial?.some(x=>Number(x.id??x.ID)===id),'POST devolvió un ID que ya existía antes de la prueba');parents.add(id);return id};
  const childPath=id=>`/${c.childRoute}/${c.relation}/${id}`;
  const childCreate=async(parent,value,label)=>{const x=await request('POST','/'+c.childRoute,{[c.textField]:label,[c.metric]:value,[c.relation]:{id:parent}});const id=idOf(x);assert(Number.isSafeInteger(id)&&id>0,'POST dependiente no devuelve ID');return id};
  const contains=(rows,id)=>rows.find(x=>idOf(x)===id);
  const canonical=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
  const unchanged=(before,after)=>before.every(x=>canonical(x)===canonical(contains(after,idOf(x))));
  const checkRelated=(row,parent,name)=>{assert(row&&Number(row[c.relation]?.id)===parent,'El JOIN debe devolver el principal correcto');assert(row[c.relation].nombre===name,'El JOIN debe devolver el nombre actual del principal')};
  const stage=async(id,fn)=>{current={id,status:'RUNNING',requests:[]};report.cases.push(current);try{await fn();current.status='PASS'}catch(e){current.status='FAIL';current.reason=e.message;throw e}finally{current=null}};
  let initial,temporary,a,b,moved,preserved;
  try {
    await stage(1,async()=>{initial=await list('/'+c.parentRoute);temporary=await createParent(prefix+' temporal');const after=await list('/'+c.parentRoute);assert(contains(after,temporary)?.nombre===prefix+' temporal','El alta no aparece en el listado');assert(after.length===initial.length+1&&unchanged(initial,after),'El alta alteró otros principales')});
    await stage(2,async()=>{await request('DELETE',`/${c.parentRoute}/${temporary}`);const after=await list('/'+c.parentRoute);assert(!contains(after,temporary),'El DELETE respondió pero la fila sigue existiendo');assert(after.length===initial.length&&unchanged(initial,after),'El DELETE alteró otros principales');parents.delete(temporary)});
    await stage(3,async()=>{a=await createParent(prefix+' A');await request('PATCH',`/${c.parentRoute}/${a}`,{nombre:prefix+' A editado'});const after=await list('/'+c.parentRoute);assert(contains(after,a)?.nombre===prefix+' A editado','El PATCH no conserva el ID con el nuevo valor');assert(after.length===initial.length+1&&unchanged(initial,after),'El PATCH insertó filas o alteró otras')});
    await stage(4,async()=>{b=await createParent(prefix+' B');moved=await childCreate(a,90,prefix+' trasladar');preserved=await childCreate(a,125,prefix+' conservar');const before=await list(childPath(a));checkRelated(contains(before,moved),a,prefix+' A editado');assert(Number(contains(before,moved)?.[c.metric])===90,'Campo numérico no persistido');await request('PATCH',`/${c.childRoute}/${moved}/${c.relation}`,{principalId:b});const afterA=await list(childPath(a)),afterB=await list(childPath(b));assert(!contains(afterA,moved)&&contains(afterA,preserved),'El cambio FK no retiró el registro de A o alteró otro');checkRelated(contains(afterB,moved),b,prefix+' B');assert(Number(contains(afterB,moved)?.[c.metric])===90,'Cambiar la FK alteró otro campo')});
    // Comprobación adicional: no cambia los cinco pesos de la rúbrica.
    const second=await childCreate(b,100,prefix+' segundo B');
    current=report.join={id:'JOIN_MINIMO',status:'RUNNING',graded:false,requests:[]};
    try{
      const path=(options.minRoute||`/${c.childRoute}/minimo/{minimo}`).replace('{minimo}','100');
      assert(path.startsWith('/'+c.childRoute+'/')&&!path.includes('://'),'Ruta de consulta no válida');
      const rows=await list(path);assert(contains(rows,preserved)&&contains(rows,second)&&!contains(rows,moved),'El filtro debe incluir 125 y 100 y excluir 90');
      assert(rows.every(x=>Number.isFinite(Number(x[c.metric]))&&Number(x[c.metric])>=100),'La consulta devuelve valores por debajo del mínimo');
      assert(rows.every((x,i)=>!i||Number(rows[i-1][c.metric])>=Number(x[c.metric])),'La consulta no está ordenada de mayor a menor');
      checkRelated(contains(rows,preserved),a,prefix+' A editado');checkRelated(contains(rows,second),b,prefix+' B');current.status='PASS';
    }catch(e){current.status='FAIL';current.reason=e.message}finally{current=null}
    await stage(5,async()=>{const beforeA=await list(childPath(a)),beforeB=await list(childPath(b));assert(contains(beforeB,moved)&&contains(beforeB,second),'Faltan los asociados preparados en B');await request('DELETE',childPath(b));assert((await list(childPath(b))).length===0,'El DELETE por FK no dejó B vacío');const afterA=await list(childPath(a));assert(beforeA.length===afterA.length&&unchanged(beforeA,afterA),'Se eliminaron o cambiaron asociados de A');await request('DELETE',`/${c.parentRoute}/${b}`);const after=await list('/'+c.parentRoute);assert(!contains(after,b)&&contains(after,a),'No se eliminó B o se eliminó A');assert(after.length===initial.length+1&&unchanged(initial,after),'Se alteraron principales ajenos');parents.delete(b)});
  }catch(e){report.error=e.message}
  finally{
    current=null;
    // Solo limpia los principales cuyos IDs devolvieron nuestros POST en esta ejecución.
    for(const id of parents){try{const row=contains(await list('/'+c.parentRoute),id);if(!row)continue;if(!String(row.nombre).startsWith(prefix)){report.cleanup.push({parentId:id,error:'Limpieza omitida: la fila no tiene nuestra marca de prueba'});continue}await request('DELETE',childPath(id));await request('DELETE',`/${c.parentRoute}/${id}`)}catch(e){report.cleanup.push({parentId:id,error:e.message})}}
    report.finishedAt=new Date().toISOString();report.functionalPass=report.cases.length===5&&report.cases.every(x=>x.status==='PASS');
  }
  return report;
}

async function main(){
 const args=process.argv.slice(2),option=k=>args[args.indexOf(k)+1];
 if(!args.includes('--caso'))throw Error('Uso: node comprobar-crud.mjs --caso CH-XX [--api http://localhost:3000] [--ruta-minimo /recurso/minimo/{minimo}]');
 const config=JSON.parse(readFileSync(new URL('./crud-contextos.json',import.meta.url),'utf8'));
 const c=config.cases[option('--caso')];if(!c)throw Error('Caso no reconocido. Usa el de tu portal.');
 const report=await comprobar(c,{api:args.includes('--api')?option('--api'):undefined,minRoute:args.includes('--ruta-minimo')?option('--ruta-minimo'):undefined});
 const git=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'});report.commitAtRun=git.status===0?git.stdout.trim():null;
 const changes=spawnSync('git',['status','--porcelain'],{encoding:'utf8'});report.workingTreeClean=changes.status===0?changes.stdout.trim()==='':null;
 const output=resolve('evidencias/crud-comprobacion.json');mkdirSync(dirname(output),{recursive:true});writeFileSync(output,JSON.stringify(report,null,2)+'\n');
 for(const x of report.cases)console.log(`Caso ${x.id}: ${x.status}${x.reason?' · '+x.reason:''}`);
 console.log(`JOIN con mínimo (adicional): ${report.join?.status||'NO_EJECUTADO'}`);
 console.log('Pruebas HTTP guardadas en '+output+'. Añade también tus comprobaciones SQL.');
 console.log('Huella del informe: '+createHash('sha256').update(readFileSync(output)).digest('hex'));
 if(report.error)console.error(report.error);process.exitCode=report.functionalPass?0:1;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e.message);process.exitCode=1});
