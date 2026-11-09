/* Material de práctica: nombres derivados de las mismas Entities del portal. */
function buildCrudCases(c) {
  const n = dbNames(c), P = c.parent.entity, C = c.child.entity;
  const pf = kebab(P), cf = kebab(C), pr = kebab(c.parent.table), cr = kebab(c.child.table);
  const rel = n.parentProperty, metric = n.metricProperty, name = n.childNameProperty;
  const api = 'API="http://localhost:3000"';
  const postP = value => `curl -i -X POST "$API/${pr}" \\\n  -H 'Content-Type: application/json' \\\n  -d '${JSON.stringify({nombre:value})}'`;
  const getP = `curl -i "$API/${pr}"`;
  const read = (v,label) => `read -r -p '${label} (ID real de la respuesta): ' ${v}`;
  const childBody = `'{"${name}":"Registro de prueba","${metric}":90,"${rel}":{"id":'"$PRINCIPAL_A"'}}'`;
  const postC = `curl -i -X POST "$API/${cr}" \\\n  -H 'Content-Type: application/json' \\\n  -d ${childBody}`;
  const methodsP = [
`  crear(nombre: string) {
    return this.repo.createQueryBuilder()
      .insert().into(${P})
      .values({ nombre })
      .returning(["id", "nombre"])
      .execute();
  }

  listar() {
    return this.repo.createQueryBuilder("principal")
      .orderBy("principal.id", "ASC")
      .getMany();
  }`,
`  eliminar(id: number) {
    return this.repo.createQueryBuilder()
      .delete().from(${P})
      .where('"ID" = :id', { id })
      .execute();
  }`,
`  modificar(id: number, nombre: string) {
    return this.repo.createQueryBuilder()
      .update(${P}).set({ nombre })
      .where('"ID" = :id', { id })
      .execute();
  }`];
  const methodsC = [
`  crear(data: { ${name}: string; ${metric}: number; ${rel}: { id: number } }) {
    return this.repo.createQueryBuilder()
      .insert().into(${C})
      .values({
        ${name}: data.${name},
        ${metric}: data.${metric},
        ${rel}: { id: data.${rel}.id },
      })
      .returning(["id"])
      .execute();
  }

  listarPorPrincipal(principalId: number) {
    return this.repo.createQueryBuilder("registro")
      .innerJoinAndSelect("registro.${rel}", "principal")
      .where("principal.id = :principalId", { principalId })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  cambiarPrincipal(id: number, principalId: number) {
    return this.repo.createQueryBuilder()
      .update(${C}).set({ ${rel}: { id: principalId } })
      .where('"ID" = :id', { id })
      .execute();
  }`,
`  eliminarPorPrincipal(principalId: number) {
    return this.repo.createQueryBuilder()
      .delete().from(${C})
      .where('"${n.foreignKey}" = :principalId', { principalId })
      .execute();
  }`];
  const controllersP=[
`  @Post()
  crear(@Body() body: { nombre: string }) {
    return this.service.crear(body.nombre);
  }

  @Get()
  listar() {
    return this.service.listar();
  }`,
`  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }`,
`  @Patch(":id")
  modificar(@Param("id", ParseIntPipe) id: number, @Body() body: { nombre: string }) {
    return this.service.modificar(id, body.nombre);
  }`];
  const controllersC=[
`  @Post()
  crear(@Body() body: { ${name}: string; ${metric}: number; ${rel}: { id: number } }) {
    return this.service.crear(body);
  }

  @Get("${rel}/:principalId")
  listarPorPrincipal(@Param("principalId", ParseIntPipe) principalId: number) {
    return this.service.listarPorPrincipal(principalId);
  }

  @Patch(":id/${rel}")
  cambiarPrincipal(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { principalId: number },
  ) {
    return this.service.cambiarPrincipal(id, body.principalId);
  }`,
`  @Delete("${rel}/:principalId")
  eliminarPorPrincipal(@Param("principalId", ParseIntPipe) principalId: number) {
    return this.service.eliminarPorPrincipal(principalId);
  }`];
  const listC = v => `curl -i "$API/${cr}/${rel}/$${v}"`;
  const sqlP = `SELECT "ID", "NOMBRE" FROM "${n.parentTable}" ORDER BY "ID";`;
  const sqlC = `SELECT "ID", "${n.childName}", "${n.metric}", "${n.foreignKey}"\nFROM "${n.childTable}" ORDER BY "ID";`;
  const steps = [
    {title:'Añadir y listar',goal:`Crea un ${P} y lista la tabla para localizarlo por su ID.`,before:`Puede haber otros registros. Trabaja solo con los datos de prueba que crees.`,snippets:methodsP[0],help:'insert inicia INSERT; values indica los valores. returning devuelve las columnas generadas en PostgreSQL. createQueryBuilder("principal") equivale a FROM con alias; getMany devuelve Entities.',curl:[api,postP('Principal de prueba'),read('PRINCIPAL_PRUEBA','Identificador creado'),getP].join('\n\n'),expected:`POST: HTTP 201, identifiers y raw con el ID generado. GET: HTTP 200, array que incluye «Principal de prueba» con ese mismo ID. No supongas que el ID es 1.`,sql:sqlP},
    {title:'Eliminar un registro',goal:`Elimina únicamente el ${P} del caso 1 y vuelve a listar.`,before:'En la misma Git Bash, conserva PRINCIPAL_PRUEBA con el ID creado en el caso 1. Ese principal no tiene asociados.',snippets:methodsP[1],help:'delete y from señalan la tabla. WHERE limita el borrado al ID elegido. :id enlaza el valor; no concatena texto dentro de SQL.',curl:[api,`curl -i -X DELETE "$API/${pr}/$PRINCIPAL_PRUEBA"`,getP].join('\n\n'),expected:'DELETE: HTTP 200 y affected: 1. GET: el ID borrado ya no aparece; las demás filas permanecen. affected: 0 significa que no se borró ninguna fila y no completa esta prueba.',sql:sqlP},
    {title:'Modificar un dato',goal:`Crea otro ${P}; cambia su nombre y conserva el identificador.`,before:'El registro del caso 1 ya se eliminó. Crea uno nuevo para continuar con los casos 3, 4 y 5.',snippets:methodsP[2],help:'update equivale a UPDATE; set corresponde a SET. WHERE conserva el alcance en una fila. No debe ejecutarse un INSERT al editar.',curl:[api,postP('Principal A'),read('PRINCIPAL_A','Nuevo principal A'),`curl -i -X PATCH "$API/${pr}/$PRINCIPAL_A" \\\n  -H 'Content-Type: application/json' \\\n  -d '{"nombre":"Principal A actualizado"}'`,getP].join('\n\n'),expected:'POST: HTTP 201. PATCH: HTTP 200 y affected: 1. GET: «Principal A actualizado», mismo ID y sin filas duplicadas.',sql:sqlP},
    {title:'Modificar la foreign key',goal:`Crea un segundo ${P} y un ${C} asociado a A. Trasládalo a B conservando su ID.`,before:`Necesitas las dos Entities y su relación 1:N, módulos registrados y PRINCIPAL_A del caso 3. En ${C}, el campo de texto se llama ${name} y el numérico ${metric}.`,snippets:methodsC[0],help:`La propiedad Entity ${rel} representa la relación. set({ ${rel}: { id: principalId } }) actualiza la FK física ${n.foreignKey}. innerJoinAndSelect carga el principal y WHERE selecciona sus asociados.`,curl:[api,postP('Principal B'),read('PRINCIPAL_B','Principal B'),postC,read('REGISTRO','Registro asociado creado'),listC('PRINCIPAL_A'),`curl -i -X PATCH "$API/${cr}/$REGISTRO/${rel}" \\\n  -H 'Content-Type: application/json' \\\n  -d '{"principalId":'"$PRINCIPAL_B"'}'`,listC('PRINCIPAL_A'),listC('PRINCIPAL_B')].join('\n\n'),expected:`Antes del PATCH el registro aparece en A. PATCH: HTTP 200, affected: 1. Después, ese mismo ID deja de aparecer en A y aparece en B con su objeto ${rel}. Los demás registros no cambian.`,sql:sqlC},
    {title:'Eliminar asociados y principal',goal:`Elimina todos los ${C} de B y, después, elimina el ${P} B. Conserva A.`,before:'Mantén PRINCIPAL_A y PRINCIPAL_B del caso 4. La primera consulta debe mostrar al menos el registro trasladado a B.',snippets:methodsC[1]+'\n\n// Después de confirmar que B está vacío:\n'+methodsP[1],help:`El borrado de asociados usa la columna física exacta "${n.foreignKey}" de @JoinColumn. Primero DELETE del lado N; después DELETE del lado 1. Se conservan las restricciones de FK, sin borrado en cascada.`,curl:[api,listC('PRINCIPAL_B'),`curl -i -X DELETE "$API/${cr}/${rel}/$PRINCIPAL_B"`,listC('PRINCIPAL_B'),`curl -i -X DELETE "$API/${pr}/$PRINCIPAL_B"`,getP,listC('PRINCIPAL_A')].join('\n\n'),expected:'Primer DELETE: affected igual al número de asociados de B (al menos 1). Su GET devuelve []. Después DELETE del principal: affected: 1. GET de principales: B ausente y A presente. Los asociados de otros principales permanecen.',sql:sqlC+'\n\n'+sqlP}
  ];
  const service = (E,f,methods) => `import { Injectable } from "@nestjs/common";\nimport { InjectRepository } from "@nestjs/typeorm";\nimport { Repository } from "typeorm";\nimport { ${E} } from "./entities/${f}.entity";\n\n@Injectable()\nexport class ${E}Service {\n  constructor(\n    @InjectRepository(${E}) private readonly repo: Repository<${E}>,\n  ) {}\n\n${methods}\n}\n`;
  const controller = (E,f,r,methods,phase) => `import { Body, Controller, Get, Post${phase>=1?', Delete, Param, ParseIntPipe':''}${phase>=2?', Patch':''} } from "@nestjs/common";\nimport { ${E}Service } from "./${f}.service";\n\n@Controller("${r}")\nexport class ${E}Controller {\n  constructor(private readonly service: ${E}Service) {}\n\n${methods}\n}\n`;
  const module = (E,f,Other,of) => `import { Module } from "@nestjs/common";\nimport { TypeOrmModule } from "@nestjs/typeorm";\nimport { ${E} } from "./entities/${f}.entity";\nimport { ${Other} } from "../${of}/entities/${of}.entity";\nimport { ${E}Service } from "./${f}.service";\nimport { ${E}Controller } from "./${f}.controller";\n\n@Module({\n  imports: [TypeOrmModule.forFeature([${E}, ${Other}])],\n  providers: [${E}Service],\n  controllers: [${E}Controller],\n})\nexport class ${E}Module {}\n`;
  return steps.map((x,i)=>({...x,files:[
    {path:`src/${pf}/${pf}.service.ts`,code:service(P,pf,methodsP.slice(0,Math.min(i+1,3)).join('\n\n'))},
    {path:`src/${pf}/${pf}.controller.ts`,code:controller(P,pf,pr,controllersP.slice(0,Math.min(i+1,3)).join('\n\n'),Math.min(i,2))},
    {path:`src/${pf}/${pf}.module.ts`,code:module(P,pf,C,cf)},
    ...(i>=3?[
      {path:`src/${cf}/${cf}.service.ts`,code:service(C,cf,methodsC.slice(0,i===3?1:2).join('\n\n'))},
      {path:`src/${cf}/${cf}.controller.ts`,code:controller(C,cf,cr,controllersC.slice(0,i===3?1:2).join('\n\n'),3)},
      {path:`src/${cf}/${cf}.module.ts`,code:module(C,cf,P,pf)}
    ]:[])
  ],setup:`# Desde backend; solo si aún no existen\nnpx --no-install nest g module ${pf}\nnpx --no-install nest g service ${pf} --no-spec\nnpx --no-install nest g controller ${pf} --no-spec\n${i>=3?`npx --no-install nest g module ${cf}\nnpx --no-install nest g service ${cf} --no-spec\nnpx --no-install nest g controller ${cf} --no-spec\n`:''}npm run build`}));
}
function renderCrudCases(c) {
  const root=document.getElementById('crud-content'), cases=buildCrudCases(c);
  const pre=(code,extra='')=>`<pre class="crud-code ${extra}"><code>${esc(code)}</code></pre>`;
  root.innerHTML=`<p class="private-note">${esc(c.title)} · Tablas y FK iguales a las Entities de tu diagrama. Usa otra Git Bash para curl, mantén Nest arrancado y conserva las variables entre casos. Los IDs se leen de las respuestas reales. Las rutas se construyen en clase; un 404 requiere revisar el Controller y su módulo.</p><nav class="crud-tabs" role="tablist" aria-label="Cinco casos CRUD">${cases.map((x,i)=>`<button type="button" role="tab" data-crud-case="${i}" aria-selected="${i===0}">${i+1} · ${esc(x.title)}</button>`).join('')}</nav>`+cases.map((x,i)=>`<article data-crud-panel="${i}" ${i?'hidden':''}><h3>${i+1} · ${esc(x.title)}</h3><p><strong>Enunciado:</strong> ${esc(x.goal)}</p><p><strong>Antes de empezar:</strong> ${esc(x.before)}</p><nav class="crud-tabs" role="tablist" aria-label="Ayudas del caso ${i+1}">${['QueryBuilder','curl','Resultado y SQL','Archivos de esta fase'].map((t,j)=>`<button type="button" role="tab" data-crud-view="${j}" aria-selected="${j===0}">${esc(t)}</button>`).join('')}</nav><section data-crud-view-panel="0"><p>${esc(x.help)}</p>${pre(x.snippets)}<p><strong>Líneas importantes:</strong> observa el método de operación, los valores y cada condición WHERE. Los valores externos se pasan mediante parámetros. En las pestañas de archivos puedes leer cada Service y Controller completos.</p></section><section data-crud-view-panel="1" hidden><p>Ejecuta los comandos en orden. En POST con QueryBuilder, toma el ID de <code>identifiers[0].id</code> o <code>raw[0].ID</code>.</p>${pre(x.curl)}<button type="button" class="btn secondary" data-crud-copy="curl">Copiar comandos</button></section><section data-crud-view-panel="2" hidden><p><strong>Resultado esperado:</strong> ${esc(x.expected)}</p><p>Ejecuta estas consultas en PostgreSQL y contrasta los IDs reales antes y después:</p>${pre(x.sql)}<p>Al terminar el recorrido, reinicia Nest y repite las lecturas para comprobar la persistencia.</p></section><section data-crud-view-panel="3" hidden><p>Sobre el mismo backend: añade los métodos de esta fase y conserva los anteriores. Los archivos siguientes muestran cómo queda cada archivo completo. Si ya existe, edítalo; no vuelvas a generarlo.</p>${pre(x.setup)}<p>Conserva tus Entities de la pestaña 2. Comprueba que AppModule importa ambos módulos y que TypeORM registra ambas Entities. Los imports entre Entities de carpetas distintas deben apuntar a <code>../../otra-entidad/entities/otra-entidad.entity</code>.</p>${x.files.map((f,j)=>`<details class="crud-file" ${j===0?'open':''}><summary>${esc(f.path)} · archivo completo</summary><div class="crud-file-tools"><button type="button" data-crud-page="prev">← Página</button><span data-crud-page-label></span><button type="button" data-crud-page="next">Página →</button><button type="button" data-crud-whole>Ver archivo entero</button><button type="button" data-crud-copy="file">Copiar archivo completo</button></div><pre class="crud-code" data-crud-file data-code="${esc(f.code)}"><code></code></pre></details>`).join('')}</section></article>`).join('');
  root.querySelectorAll('[data-crud-file]').forEach(el=>{el._page=0;el._whole=false;paintCrudFile(el);});
  root.onclick=async e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-crud-case')){const key=b.dataset.crudCase;root.querySelectorAll('[data-crud-case]').forEach(t=>t.setAttribute('aria-selected',String(t===b)));root.querySelectorAll('[data-crud-panel]').forEach(p=>p.hidden=p.dataset.crudPanel!==key);}
    if(b.hasAttribute('data-crud-view')){const article=b.closest('article');article.querySelectorAll('[data-crud-view]').forEach(t=>t.setAttribute('aria-selected',String(t===b)));article.querySelectorAll('[data-crud-view-panel]').forEach(p=>p.hidden=p.dataset.crudViewPanel!==b.dataset.crudView);}
    const file=b.closest('.crud-file'),el=file?.querySelector('[data-crud-file]');
    if(b.hasAttribute('data-crud-page')){el._whole=false;el._page+=b.dataset.crudPage==='next'?1:-1;paintCrudFile(el);file.querySelector('[data-crud-whole]').textContent='Ver archivo entero';}
    if(b.hasAttribute('data-crud-whole')){el._whole=!el._whole;b.textContent=el._whole?'Volver a páginas':'Ver archivo entero';paintCrudFile(el);}
    if(b.hasAttribute('data-crud-copy')){try{const txt=el?el.dataset.code:b.parentElement.querySelector('pre').textContent;await navigator.clipboard.writeText(txt);b.textContent='Copiado';}catch{b.textContent='Selecciona el código para copiarlo';}}
  };
}
function paintCrudFile(el){const lines=el.dataset.code.split('\n'),total=Math.max(1,Math.ceil(lines.length/24));el._page=Math.max(0,Math.min(el._page,total-1));const shown=el._whole?lines:lines.slice(el._page*24,(el._page+1)*24);el.querySelector('code').innerHTML=shown.map(line=>/[.](where|values|set|innerJoinAndSelect|returning)\(/.test(line)?'<mark>'+esc(line)+'</mark>':esc(line)).join('\n');const root=el.closest('.crud-file');root.querySelector('[data-crud-page-label]').textContent=el._whole?`${lines.length} líneas · archivo entero`:`Página ${el._page+1} de ${total}`;root.querySelector('[data-crud-page="prev"]').disabled=el._page===0;root.querySelector('[data-crud-page="next"]').disabled=el._page===total-1;}
