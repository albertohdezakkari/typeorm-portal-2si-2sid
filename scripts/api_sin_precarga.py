"""Altas normales por API en los dos extremos. Sin seed, PartiQL ni archivos de IDs."""
from copy import deepcopy
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
REVISION=1

def cap(s):return s[0].upper()+s[1:]
def model(d):return d['context']
def block_file(path,code,explain=''):
 return dict(kind='file',title=path,path=path,code=code,create=f'mkdir -p {Path(path).parent}\ncode {path}',explain=explain,terms=[])
def cmd(title,code,explain=''):
 return dict(kind='command',title=title,code=code,explain=explain,terms=[])
def curl(base,method,route,body=None):
 text=f'curl -i'+(f' -X {method}' if method!='GET' else '')+f' "{base}{route}"'
 if body is not None:text+=" \\\n  -H 'Content-Type: application/json' \\\n  -d '"+json.dumps(body,ensure_ascii=False,separators=(',',':'))+"'"
 return text

def parent_nest(c):
 p=c['parent'];name=cap(p['route']);entity=p['entity'];base='src/'+p['route']+'/'+p['route']
 service=f"""import {{ Injectable }} from '@nestjs/common';
import {{ InjectRepository }} from '@nestjs/typeorm';
import {{ Repository }} from 'typeorm';
import {{ {entity} }} from './entities/{p['property']}.entity';

@Injectable()
export class {name}Service {{
  constructor(
    @InjectRepository({entity}) private readonly {p['route']}: Repository<{entity}>
  ) {{}}

  crear{entity}(nombre: string) {{
    const {p['property']} = this.{p['route']}.create({{ nombre }});
    return this.{p['route']}.save({p['property']});
  }}

  listar{name}() {{
    return this.{p['route']}.find({{ order: {{ id: 'ASC' }} }});
  }}
}}"""
 controller=f"""import {{ Body, Controller, Get, Post }} from '@nestjs/common';
import {{ {name}Service }} from './{p['route']}.service';

@Controller('{p['route']}')
export class {name}Controller {{
  constructor(private readonly service: {name}Service) {{}}

  @Post()
  crear(@Body() datos: {{ nombre: string }}) {{
    return this.service.crear{entity}(datos.nombre);
  }}

  @Get()
  listar() {{
    return this.service.listar{name}();
  }}
}}"""
 module=f"""import {{ Module }} from '@nestjs/common';
import {{ TypeOrmModule }} from '@nestjs/typeorm';
import {{ {entity} }} from './entities/{p['property']}.entity';
import {{ {name}Service }} from './{p['route']}.service';
import {{ {name}Controller }} from './{p['route']}.controller';

@Module({{
  imports: [TypeOrmModule.forFeature([{entity}])],
  providers: [{name}Service],
  controllers: [{name}Controller]
}})
export class {name}Module {{}}"""
 controller='/* Terminal 2 · Nest abierto en Terminal 1\n'+curl('http://localhost:3000','POST','/'+p['route'],{'nombre':p['examples'][0]})+'\n'+curl('http://localhost:3000','GET','/'+p['route'])+'\n*/\n'+controller
 return {base+'.service.ts':service,base+'.controller.ts':controller,base+'.module.ts':module}

def add_module(code,c):
 p=c['parent'];name=cap(p['route'])+'Module'
 if f'import {{ {name} }}'not in code:
  anchor='\n@Module';code=code.replace(anchor,f"\nimport {{ {name} }} from './{p['route']}/{p['route']}.module';\n"+anchor)
  child=cap(c['child']['route'])+'Module';code=code.replace('    '+child,'    '+name+',\n    '+child,1)
 return code

def parent_cloud(c):
 p=c['parent'];name=cap(p['route']);entity=p['entity'];prop=p['property'];key=p['input'];path='src/'+p['route']+'/crear-listar/';imp='../../models/'+Path(c['modelFile']).name
 repository=f"""import {{ EntityRepository }} from 'dynamodb-toolbox/entity/actions/repository';
import {{ {p['model']} }} from '{imp}';

export async function crear{entity}Repository({prop}) {{
  await {p['model']}.build(EntityRepository).put(
    {prop},
    {{ condition: {{ attr: '{key}', exists: false }} }}
  );
}}

export async function listar{name}Repository() {{
  const {{ Items = [] }} = await {p['model']}.build(EntityRepository).scan(
    {{ consistent: true }}
  );
  return Items;
}}"""
 service=f"""import {{ crear{entity}Repository, listar{name}Repository }} from './repository.mjs';

export async function crear{entity}Service(nombre) {{
  const {key} = Date.now();
  const {prop} = {{ {key}, nombre }};
  await crear{entity}Repository({prop});
  return {prop};
}}

export function listar{name}Service() {{
  return listar{name}Repository();
}}"""
 handler=f"""// POST /{p['route']} con JSON: {{"nombre":"{p['examples'][0]}"}}
// GET /{p['route']} lista los registros y sus IDs.
import {{ crear{entity}Service, listar{name}Service }} from './service.mjs';

export async function crearHandler(event) {{
  const {{ nombre }} = JSON.parse(event.body);
  const {prop} = await crear{entity}Service(nombre);
  return {{ statusCode: 201, body: JSON.stringify({prop}) }};
}}

export async function listarHandler() {{
  const {p['route']} = await listar{name}Service();
  return {{ statusCode: 200, body: JSON.stringify({p['route']}) }};
}}"""
 handler='/* Terminal · API_URL es la URL real de tu API\n'+curl('$API_URL','POST','/'+p['route'],{'nombre':p['examples'][0]})+'\n'+curl('$API_URL','GET','/'+p['route'])+'\n*/\n'+handler
 return {path+'repository.mjs':repository,path+'service.mjs':service,path+'handler.mjs':handler}

def add_functions(code,c):
 p=c['parent'];name=cap(p['route']);fragment=f"""  crear{p['entity']}:
    handler: src/{p['route']}/crear-listar/handler.crearHandler
    events:
      - httpApi: {{ method: POST, path: /{p['route']} }}
  listar{name}:
    handler: src/{p['route']}/crear-listar/handler.listarHandler
    events:
      - httpApi: {{ method: GET, path: /{p['route']} }}
"""
 if '\n  crear'+p['entity']+':'not in code:code=code.replace('functions:\n','functions:\n'+fragment,1)
 return code

def instructions(c,tech):
 p=c['parent'];n=c['child'];return ('Ejecuta una petición cada vez en Terminal 2. '+
 'POST devuelve el ID real. Cópialo y úsalo en las siguientes peticiones; los números 1, 2 y 4 son ejemplos, no IDs impuestos. '+
 ('Nest mantiene el servidor abierto en Terminal 1.' if tech=='nest'else 'API_URL contiene la URL de tu API. Los IDs de Date.now suelen ser números largos; sustituye los ejemplos por los recibidos.'))

def parent_requests(c,tech):
 base='http://localhost:3000'if tech=='nest'else'$API_URL';p=c['parent']
 return [cmd('1 · Crear '+p['examples'][0],curl(base,'POST','/'+p['route'],{'nombre':p['examples'][0]}),'Anota el ID que devuelve este POST.'),cmd('2 · Crear '+p['examples'][1],curl(base,'POST','/'+p['route'],{'nombre':p['examples'][1]}),'Anota el segundo ID; lo usarás para cambiar la relación.'),cmd('3 · Listar '+p['route'],curl(base,'GET','/'+p['route']),'Comprueba que existen antes de añadir registros relacionados.')]

def case_requests(d,tech,ch):
 c=model(d);p=c['parent'];n=c['child'];m=c['metric'];base='http://localhost:3000'if tech=='nest'else'$API_URL';route='/'+n['route'];key=p['input'];text=c['text']['property']
 if ch==1:
  result=[cmd('Listar antes de crear',curl(base,'GET',route))]
  for i,row in enumerate(d['fixtures']):
   result.append(cmd('Añadir '+row['name'],curl(base,'POST',route,{text:row['name'],m['property']:row['value'],key:row['parent']}),'Usa el ID real del principal. Conserva el ID de este registro para las modificaciones.'))
  result.append(cmd('Añadir el registro de prueba',curl(base,'POST',route,{text:c['createName'],m['property']:m['create'],key:2}),'Anota el ID devuelto; el siguiente caso eliminará solo este registro.'))
  result.append(cmd('Listar después de las altas',curl(base,'GET',route)))
  return result
 if ch==2:return[cmd('Eliminar solo el registro de prueba',curl(base,'DELETE',route+'/4'),'Sustituye 4 por el ID devuelto para el registro de prueba.'),cmd('Listar los que se conservan',curl(base,'GET',route))]
 if ch==3:return[cmd('Cambiar '+m['label'].lower(),curl(base,'PATCH',route+'/1',{m['property']:m['after']}),'Sustituye 1 por el ID del primer registro creado.'),cmd('Ver el resultado',curl(base,'GET',route))]
 if ch==4:return[cmd('Cambiar la relación',curl(base,'PATCH',route+'/1/'+p['property'],{key:2}),'Usa el ID real del registro y del segundo principal.'),cmd('Ver la nueva relación',curl(base,'GET',route))]
 return[cmd('Consultar por el principal',curl(base,'GET','/'+p['route']+'/2'+route+'?minimo='+str(m['minimum'])),'Sustituye 2 por el ID del segundo principal.')]

def api_stage(name,path,code,scene='parent-api'):
 token=code.splitlines()[0];note='Lee el archivo completo, guárdalo y sigue el orden de los pasos.'
 if path.endswith('.service.ts'):
  token=re.search(r'return this\.\w+\.save\([^\n]+',code)[0];note='El Service usa el repositorio de su Entity: create prepara el objeto, save lo guarda y devuelve su ID; find permite listar lo guardado.'
 elif path.endswith('service.mjs'):
  token='Date.now()';note='El Service genera el ID, prepara el objeto y llama al Repository. Conserva el ID de la respuesta para relacionar el siguiente registro.'
 elif path.endswith('repository.mjs'):
  token='build(EntityRepository)';note='El Repository parte de Entity. put guarda un registro; scan lee los registros para el listado.'
 elif path.endswith('.controller.ts'):
  token='@Post()';note='El Controller recibe el JSON de POST y entrega nombre al Service. GET llama al listado del mismo Service.'
 elif path.endswith('handler.mjs'):
  token='JSON.parse(event.body)';note='El Handler recibe el cuerpo JSON de API Gateway, entrega nombre al Service y devuelve el registro creado. El otro Handler atiende GET.'
 elif path.endswith('.module.ts') and path!='src/app.module.ts':
  token='TypeOrmModule.forFeature';note='forFeature permite inyectar el repositorio de esta Entity. El módulo registra su Service y su Controller.'
 elif path=='src/app.module.ts':
  token='imports: [';note='Conserva la conexión del proyecto base y registra los módulos de los dos extremos de la relación.'
 elif path=='serverless.yml':
  token='functions:';note='Cada función vincula un Handler con una ruta y un método HTTP. Guarda los archivos y despliega antes de probar.'
 elif path.startswith('Peticiones'):
  note='Ejecuta cada POST, observa su respuesta y anota su ID. GET muestra los principales disponibles; usa esos IDs al crear los registros relacionados.'
 return dict(chapter=0,name=name,path=path,code=code,cues=[dict(text=token,title=name,note=note)],page=2,exact=False,scene=scene,apiStage=True)

def training(d):
 c=model(d);p=c['parent'];n=c['child'];old=deepcopy(d['steps']);previous=d.get('apiRevision',0)
 # Los pasos ya generados se reconstruyen desde la misma fuente.
 for tech in ['nest','cloud']:
  d['steps'][tech]=[s for s in d['steps'][tech]if not s.get('apiStage')]
  if tech=='nest':files=parent_nest(c)
  else:files=parent_cloud(c)
  additions=[api_stage(('Service · 'if path.endswith('.service.ts')or path.endswith('service.mjs')else'Controller · 'if path.endswith('.controller.ts')else'Handler · 'if path.endswith('handler.mjs')else'Módulo · 'if path.endswith('.module.ts')else'Repository · ')+p['entity'],path,code)for path,code in files.items()]
  if tech=='nest':
   # Service → Controller → módulo; el módulo se conecta después a AppModule.
   app=d.get('apiAppModule')
   if not app:
    prep=json.loads((ROOT/f"preparar/{c['id']}.json").read_text());app=next(b['code']for s in prep['tracks']['nest']if s['id']=='modelos'for b in s['blocks']if b.get('path')=='src/app.module.ts')
   app=add_module(app,c);d['apiAppModule']=app;additions.append(api_stage('Conecta ambos módulos','src/app.module.ts',app))
  else:
   for s in d['steps'][tech]:
    if 'functions:'in s['code']and s['path'].startswith('serverless.yml'):s['code']=add_functions(s['code'],c)
   prep=json.loads((ROOT/f"preparar/{c['id']}.json").read_text());yaml=next(b['code']for s in prep['tracks']['cloud']if s['id']=='modelos'for b in s['blocks']if b.get('path')=='serverless.yml');yaml=add_functions(yaml,c)
   additions.append(api_stage('Conecta las altas y los listados','serverless.yml',yaml));d['apiCloudYaml']=yaml
  reqs=parent_requests(c,tech);additions.append(api_stage('Crear y listar '+p['route'],'Peticiones · '+p['route'],'\n\n'.join(b['code']for b in reqs)))
  at=next((i for i,s in enumerate(d['steps'][tech])if s['chapter']>0),len(d['steps'][tech]));d['steps'][tech][at:at]=additions
  for s in d['steps'][tech]:
   if s['scene']=='result':
    s['code']='\n\n'.join(b['code']for b in case_requests(d,tech,s['chapter']));s['cues']=[]
 d['apiRevision']=REVISION
 if not previous:
  migration={}
  for tech,steps in old.items():
   positions=[];retained={}
   for i,s in enumerate(steps):
    match=next((j for j,x in enumerate(d['steps'][tech])if x['chapter']==s['chapter']and x['name']==s['name']and x['path']==s['path']),0);positions.append(match)
    if s['code']==d['steps'][tech][match]['code']and s['cues']==d['steps'][tech][match]['cues']:retained[str(i)]=match
   migration[tech]={'positions':positions,'retained':retained}
  d['apiMigration']=migration
 return d

def preparation(d,train):
 c=model(train);p=c['parent'];n=c['child'];nf=parent_nest(c);cf=parent_cloud(c)
 for tech in ['nest','cloud']:
  phases=d['tracks'][tech]
  for s in phases:
   # Retirar altas directas y los automatismos de IDs de los pasos activos.
   s['blocks']=[b for b in s['blocks']if not re.search(r'cargar-datos|ids-aula\.env|execute-statement',b.get('path','')+' '+b.get('code',''))]
   if s['id']=='modelos':
    s['blocks']=[b for b in s['blocks']if not b.get('apiFile')]
    for b in s['blocks']:
     if b.get('path')=='src/app.module.ts':b['code']=train['apiAppModule']
     if b.get('path')=='serverless.yml':b['code']=add_functions(b['code'],c)
    for path,code in(nf if tech=='nest'else cf).items():s['blocks'].append({**block_file(path,code,'Alta y listado normales: el Controller/Handler llama al Service.'),'apiFile':True})
    s['expect']='Los dos extremos tienen Entity y API. Puedes crear y listar '+p['route']+' antes de crear '+n['route']+'.'
   if s['id']=='datos':
    s.update(title='Crear y listar '+p['route']+' por API',scene='trace',nodes=['POST /'+p['route'],'Controller / Handler','Service','GET /'+p['route']],where='Terminal 2 · tu proyecto '+('Nest'if tech=='nest'else'Serverless'),lead='Cada alta entra por el Controller o Handler y pasa por su Service. Conserva los IDs devueltos.',blocks=parent_requests(c,tech),expect='GET /'+p['route']+' muestra los dos registros creados y sus IDs reales.')
   if s['id'].startswith('caso-'):
    ch=int(s['id'][5:]);kept=[b for b in s['blocks']if b['kind']!='command'and not b.get('apiFile')];commands=[]
    if tech=='cloud':
     for b in kept:
      if b.get('path')=='serverless.yml':b['code']=add_functions(b['code'],c)
     commands=[cmd('Despliega los archivos guardados','npm run package\nnpm run deploy')]
    s['blocks']=kept+commands+case_requests(train,tech,ch)
    s['expect']=instructions(c,tech)
  # Los modelos están listos al llegar a las altas: en Nest falta arrancar la app.
  phase=next(s for s in phases if s['id']=='datos')
  if tech=='nest':phase['blocks'].insert(0,cmd('Terminal 1 · arrancar Nest','npm run start:dev','Deja esta terminal abierta y ejecuta los curl en Terminal 2.'))
 d['apiRevision']=REVISION
 return d

def nm(d,nest,cloud=None):
 c=d.get('context')or json.loads((ROOT/f"entrenar/casos/{d['caseId']}.json").read_text())['context'];train=json.loads((ROOT/f"entrenar/casos/{d['caseId']}.json").read_text());p=c['parent'];n=c['child'];before=deepcopy(d['tracks']);previous=d.get('apiRevision',0)
 nest['README.md']='# '+c['title']+' · API del proyecto\n\nContinúa tu backend preparado siguiendo el README de la base docente. Crea las Entities, sus módulos, Services y Controllers. Todas las altas 1:N y N:M se hacen mediante POST y los listados mediante GET. Conserva los IDs devueltos; no hay scripts de carga ni ficheros de IDs. Mantén npm run start:dev abierto y ejecuta cada curl en otra terminal.\n'
 if '.gitignore'in nest:nest['.gitignore']='\n'.join(line for line in nest['.gitignore'].splitlines()if 'ids-aula'not in line)+'\n'
 nest.update(parent_nest(c));nest['src/app.module.ts']=add_module(nest['src/app.module.ts'],c);nest.pop('src/datos/cargar-datos.ts',None);nest.pop('src/datos/cargar-datos-nm.ts',None)
 if cloud is not None:
  cloud['README.md']='# '+c['title']+' · API Serverless\n\nContinúa la base Serverless 3 y su guía de Codespaces. Define las tablas, Table y Entity; prepara Repository, Service y Handler y conecta las rutas en serverless.yml. Todas las altas se hacen mediante POST y los listados mediante GET, desde las funciones que has programado. Conserva los IDs devueltos. No hay inserciones directas ni scripts de carga.\n'
  cloud.update(parent_cloud(c));cloud['serverless.yml']=add_functions(cloud['serverless.yml'],c)
  for name in list(cloud):
   if 'cargar-datos'in name:cloud.pop(name)
 # N:M empieza sobre los registros creados en la API 1:N, no sobre un seed.
 d['tracks']['cloud']=[s for s in d['tracks']['cloud']if s['chapter']!=2]
 nest_requests={s['id']:s['code']for s in d['tracks']['nest']if s['id'].endswith('-curl')or s['id']=='persistencia'}
 for tech,steps in d['tracks'].items():
  for s in steps:
   if s.get('path')=='src/app.module.ts':s['code']=add_module(s['code'],c)
   if 'functions:'in s['code']and 'serverless.yml'in s.get('path',''):s['code']=add_functions(s['code'],c)
   if s['id'].endswith('-curl')or s['id']=='persistencia':
    if s['id']in nest_requests:s['code']=nest_requests[s['id']].replace('http://localhost:3000','$API_URL')if tech=='cloud'else nest_requests[s['id']]
    s['code']=s['code'].replace('/'+n['route']+'/7/','/'+n['route']+'/1/');s['cues']=[];s['note']=instructions(c,tech)+' En N:M usa el ID del registro 1:N y el del perfil que acabas de crear.'
   if s['id']=='retomar':s['note']='Continúa en el backend 1:N existente. Los registros de ambos extremos se crean mediante POST y se consultan con GET; conserva sus IDs reales. '+instructions(c,tech)
   if s['id'].endswith('-evento'):
    data=json.loads(s['code']);
    if isinstance(data.get('pathParameters'),dict):
     for k,v in data['pathParameters'].items():data['pathParameters'][k]='1'
    if data.get('body')and isinstance(data['body'],str):
     body=json.loads(data['body'])
     for k,v in body.items():
      if k.endswith('Id'):body[k]=1
     data['body']=json.dumps(body,ensure_ascii=False,separators=(',',':'))
    s['code']=json.dumps(data,ensure_ascii=False,indent=2);s['cues']=[];s['note']=instructions(c,tech)+' Guarda este JSON con los IDs reales antes del Invoke.'
   if tech=='cloud'and s['chapter']>=3:s['expect']='Realiza esta operación sobre los IDs creados mediante la API. '+instructions(c,tech)
 d['apiContext']=c
 profile=json.loads((ROOT/'scripts/nm-contextos.json').read_text())[d['caseId']]
 d['apiProfile']={'entity':profile[0],'route':profile[1],'input':profile[0].lower()+'Id','role':profile[2]}
 for steps in d['tracks'].values():
  for step in steps:
   fresh=[]
   for cue in step['cues']:
    start=step['code'].find(cue['token'])
    if start>=0:fresh.append({**cue,'start':start,'end':start+len(cue['token'])})
   step['cues']=fresh
 d['apiRevision']=REVISION
 if not previous:
  d['apiPreviousIds']={t:[s['id']for s in steps]for t,steps in before.items()}
 return d
