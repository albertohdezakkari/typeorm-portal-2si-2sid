"""Unidad N:M CH-22. Fuente única de código, pasos y pruebas; no escribe entrenar/."""
from pathlib import Path
import json,re,shutil
from toolbox_entity_repository import entity_repository
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'nm'
OLD=json.loads((ROOT/'preparar/CH-22.json').read_text())
BASE=ROOT.parent/'festival-checkin-01/bases'

def code(s):return s.strip()+'\n'
def write(p,s):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s)

def baseline(tech):
 files={}
 folder=BASE/('taller-nest' if tech=='nest' else 'taller-serverless')
 for path in ['package.json','package-lock.json','.gitignore','tsconfig.json','.env.example','src/main.ts','src/app.module.ts','src/datos/dynamo.mjs','src/salud/handler.mjs']:
  if (folder/path).exists():files[path]=(folder/path).read_text()
 for s in OLD['tracks'][tech]:
  for b in s['blocks']:
   if b['kind']=='file' and b['path']!='.env':files[b['path']]=code(b['code'])
 return files


NEST=baseline('nest'); CLOUD=baseline('cloud')
CLOUD={path:entity_repository(text) if path.endswith('/repository.mjs') else text for path,text in CLOUD.items()}
PROF=code('''import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asignacion } from '../../asignaciones/entities/asignacion.entity';

@Entity({ name: 'PROFESIONAL' })
export class Profesional {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({ name: 'NOMBRE', type: 'varchar', length: 120 })
  nombre!: string;

  @Column({ name: 'APELLIDOS', type: 'varchar', length: 160 })
  apellidos!: string;

  @Column({ name: 'EMAIL', type: 'varchar', length: 180 })
  email!: string;

  @OneToMany(() => Asignacion, asignacion => asignacion.profesional)
  asignaciones!: Asignacion[];
}''')
PROF_DRAFT=PROF.replace("import { Asignacion } from '../../asignaciones/entities/asignacion.entity';\n",'').replace('\n  @OneToMany(() => Asignacion, asignacion => asignacion.profesional)\n  asignaciones!: Asignacion[];','').replace('Entity, OneToMany,','Entity,')
ASIG=code('''import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Profesional } from '../../profesionales/entities/profesional.entity';

@Entity({ name: 'ASIGNACION' })
export class Asignacion {
  @PrimaryColumn({ name: 'ID_OBRA', type: 'integer' })
  obraId!: number;

  @PrimaryColumn({ name: 'ID_PROFESIONAL', type: 'integer' })
  profesionalId!: number;

  @Column({ name: 'ROL', type: 'varchar', length: 120 })
  rol!: string;

  @ManyToOne(() => Obra, obra => obra.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_OBRA' })
  obra!: Obra;

  @ManyToOne(() => Profesional, profesional => profesional.asignaciones, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ID_PROFESIONAL' })
  profesional!: Profesional;
}''')
# Las inversas se añaden después de que exista Asignacion.
ASIG_DRAFT=ASIG.replace('obra => obra.asignaciones, ', '').replace('profesional => profesional.asignaciones, ', '')
OBRA=NEST['src/obras/entities/obra.entity.ts'].replace('Column, Entity,','Column, Entity, OneToMany,')
OBRA=OBRA.replace("import { Ayuntamiento }", "import { Asignacion } from '../../asignaciones/entities/asignacion.entity';\nimport { Ayuntamiento }")
OBRA=OBRA.rstrip()[:-1]+'''  @OneToMany(() => Asignacion, asignacion => asignacion.obra)
  asignaciones!: Asignacion[];
}
'''
MODELS=code('''import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_PROFESIONALES = new Table({
  name: process.env.TABLA_PROFESIONALES,
  documentClient: db,
  partitionKey: { name: 'PROFESIONAL_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'OBRA_ID', type: 'number' },
  sortKey: { name: 'PROFESIONAL_ID', type: 'number' },
  indexes: {
    PorProfesional: {
      type: 'global',
      partitionKey: { name: 'PROFESIONAL_ID', type: 'number' },
      sortKey: { name: 'OBRA_ID', type: 'number' }
    }
  }
});

export const MODELO_PROFESIONAL = new Entity({
  name: 'Profesional',
  table: TABLA_PROFESIONALES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    profesionalId: number().key().savedAs('PROFESIONAL_ID'),
    nombre: string().savedAs('NOMBRE'),
    apellidos: string().savedAs('APELLIDOS'),
    email: string().savedAs('EMAIL')
  })
});

export const MODELO_ASIGNACION = new Entity({
  name: 'Asignacion',
  table: TABLA_ASIGNACIONES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    obraId: number().key().savedAs('OBRA_ID'),
    profesionalId: number().key().savedAs('PROFESIONAL_ID'),
    rol: string().savedAs('ROL')
  })
});''')
TABLES=MODELS[:MODELS.index('export const MODELO_PROFESIONAL')]
NEST['src/profesionales/entities/profesional.entity.ts']=PROF
NEST['src/asignaciones/entities/asignacion.entity.ts']=ASIG
NEST['src/obras/entities/obra.entity.ts']=OBRA
CLOUD['src/models/profesional-asignacion.model.mjs']=MODELS

cases=[
 dict(slug='crear-listar',domain='profesionales',title='Crear y listar profesionales',name='Profesionales',methods=[('crearProfesional','POST','/profesionales','crearHandler'),('listarProfesionales','GET','/profesionales','listarHandler')],cmd='PutItemCommand · ScanCommand',request={'nombre':'Lucía','apellidos':'Navarro Gil','email':'lucia.navarro@example.test'},expect='POST 201 devuelve el ID real creado. GET 200 muestra los profesionales iniciales y a Lucía; no crea asignaciones.'),
 dict(slug='asignar-profesional',domain='asignaciones',title='Asignar un profesional',name='AsignarProfesional',methods=[('asignarProfesional','POST','/obras/{obraId}/asignaciones','handler')],cmd='GetItemCommand · PutItemCommand',request={'profesionalId':2,'rol':'Arquitecta'},expect='Se crea (8,2). Hay cuatro asignaciones. Repetir (8,2) devuelve 409 y conserva el rol anterior.'),
 dict(slug='listar-por-obra',domain='asignaciones',title='Leer por obra',name='ListarPorObra',methods=[('listarAsignacionesPorObra','GET','/obras/{obraId}/asignaciones','handler')],cmd='QueryCommand',expect='La obra 7 devuelve (7,1,Electricista) y (7,2,Arquitecta): dos profesionales para una obra.'),
 dict(slug='listar-por-profesional',domain='asignaciones',title='Leer por profesional',name='ListarPorProfesional',methods=[('listarAsignacionesPorProfesional','GET','/profesionales/{profesionalId}/asignaciones','handler')],cmd='QueryCommand · PorProfesional',expect='El profesional 1 devuelve las obras 7 y 8 con sus roles. El GSI puede tardar en reflejar una escritura reciente.'),
 dict(slug='modificar-rol',domain='asignaciones',title='Cambiar el rol',name='ModificarRol',methods=[('modificarRol','PATCH','/obras/{obraId}/asignaciones/{profesionalId}','handler')],cmd='UpdateItemCommand',request={'rol':'Jefe de equipo'},expect='Solo (7,1) cambia a Jefe de equipo. Permanecen los dos IDs y los otros tres vínculos.'),
 dict(slug='eliminar-asignacion',domain='asignaciones',title='Quitar el vínculo',name='EliminarAsignacion',methods=[('eliminarAsignacion','DELETE','/obras/{obraId}/asignaciones/{profesionalId}','handler')],cmd='DeleteItemCommand',expect='HTTP 204. Se elimina solo (7,1); permanecen (7,2), (8,1), (8,2), las obras y los profesionales.')
]

def nest_repo(name,imports,constructor,body):
 return code("import { Injectable } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\n"+imports+f"\n@Injectable()\nexport class {name}Repository {{\n  constructor(\n{constructor}\n  ) {{}}\n\n{body}\n}}")
NP="import { Profesional } from '../entities/profesional.entity';\n"
NA="import { Asignacion } from '../entities/asignacion.entity';\n"
PCTOR="    @InjectRepository(Profesional) private readonly profesionales: Repository<Profesional>"
ACTOR="    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>"
old=NEST['src/taller.module.ts']
casefiles={'nest':[], 'cloud':[]}
for idx,c in enumerate(cases,1):
 prefix=f"src/{c['domain']}/{c['slug']}/"
 name=c['name']
 if idx==1:
  nr=nest_repo(name,NP,PCTOR,'''  crearProfesionalRepository(nombre: string, apellidos: string, email: string) {
    const profesional = this.profesionales.create({ nombre, apellidos, email });
    return this.profesionales.save(profesional);
  }

  listarProfesionalesRepository() {
    return this.profesionales.find({ order: { id: 'ASC' } });
  }''')
  ns=code('''import { Injectable } from '@nestjs/common';
import { ProfesionalesRepository } from './repository';

@Injectable()
export class ProfesionalesService {
  constructor(private readonly repository: ProfesionalesRepository) {}

  crearProfesionalService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearProfesionalRepository(nombre, apellidos, email);
  }

  listarProfesionalesService() {
    return this.repository.listarProfesionalesRepository();
  }
}''')
  nc=code('''import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfesionalesService } from './service';

@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly service: ProfesionalesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearProfesionalService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarProfesionalesService();
  }
}''')
  cr=code('''import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { ScanCommand } from 'dynamodb-toolbox/table/actions/scan';
import { MODELO_PROFESIONAL, TABLA_PROFESIONALES } from '../../models/profesional-asignacion.model.mjs';

export async function crearProfesionalRepository(profesional) {
  await MODELO_PROFESIONAL.build(PutItemCommand)
    .item(profesional)
    .options({ condition: { attr: 'profesionalId', exists: false } })
    .send();
}

export async function listarProfesionalesRepository() {
  const { Items = [] } = await TABLA_PROFESIONALES.build(ScanCommand)
    .entities(MODELO_PROFESIONAL)
    .options({ consistent: true })
    .send();
  return Items;
}''')
  cs=code('''import { crearProfesionalRepository, listarProfesionalesRepository } from './repository.mjs';

export async function crearProfesionalService(nombre, apellidos, email) {
  const profesionalId = Date.now();
  const profesional = { profesionalId, nombre, apellidos, email };
  await crearProfesionalRepository(profesional);
  return profesional;
}

export function listarProfesionalesService() {
  return listarProfesionalesRepository();
}''')
  ch=code('''import { crearProfesionalService, listarProfesionalesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const profesional = await crearProfesionalService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(profesional) };
}

export async function listarHandler() {
  const profesionales = await listarProfesionalesService();
  return { statusCode: 200, body: JSON.stringify(profesionales) };
}''')
 elif idx==2:
  nr=nest_repo(name,NA+"import { Obra } from '../../obras/entities/obra.entity';\nimport { Profesional } from '../../profesionales/entities/profesional.entity';\n",ACTOR+',\n    @InjectRepository(Obra) private readonly obras: Repository<Obra>,\n'+PCTOR,'''  buscarObraRepository(obraId: number) {
    return this.obras.findOneBy({ id: obraId });
  }

  buscarProfesionalRepository(profesionalId: number) {
    return this.profesionales.findOneBy({ id: profesionalId });
  }

  async asignarProfesionalRepository(obraId: number, profesionalId: number, rol: string) {
    const asignacion = { obraId, profesionalId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }''')
  ns=code('''import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarProfesionalRepository } from './repository';

@Injectable()
export class AsignarProfesionalService {
  constructor(private readonly repository: AsignarProfesionalRepository) {}

  async asignarProfesionalService(obraId: number, profesionalId: number, rol: string) {
    const obra = await this.repository.buscarObraRepository(obraId);
    const profesional = await this.repository.buscarProfesionalRepository(profesionalId);
    if (!obra || !profesional) {
      throw new NotFoundException('No existe la obra o el profesional');
    }

    try {
      return await this.repository.asignarProfesionalRepository(obraId, profesionalId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El profesional ya está asignado a esa obra');
      }
      throw error;
    }
  }
}''')
  nc=code('''import { Body, Controller, Param, Post } from '@nestjs/common';
import { AsignarProfesionalService } from './service';

@Controller('obras/:obraId/asignaciones')
export class AsignarProfesionalController {
  constructor(private readonly service: AsignarProfesionalService) {}

  @Post()
  asignar(@Param('obraId') obraId: string, @Body() datos: { profesionalId: number; rol: string }) {
    return this.service.asignarProfesionalService(Number(obraId), datos.profesionalId, datos.rol);
  }
}''')
  cr=code('''import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { MODELO_OBRA } from '../../models/ayuntamiento-obra.model.mjs';
import { MODELO_PROFESIONAL, MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function buscarObraRepository(obraId) {
  const { Item } = await MODELO_OBRA.build(GetItemCommand)
    .key({ obraId }).options({ consistent: true }).send();
  return Item;
}

export async function buscarProfesionalRepository(profesionalId) {
  const { Item } = await MODELO_PROFESIONAL.build(GetItemCommand)
    .key({ profesionalId }).options({ consistent: true }).send();
  return Item;
}

export async function asignarProfesionalRepository(obraId, profesionalId, rol) {
  const asignacion = { obraId, profesionalId, rol };
  await MODELO_ASIGNACION.build(PutItemCommand)
    .item(asignacion)
    .options({ condition: { attr: 'obraId', exists: false } })
    .send();
  return asignacion;
}''')
  cs=code('''import { buscarObraRepository, buscarProfesionalRepository, asignarProfesionalRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarProfesionalService(obraId, profesionalId, rol) {
  const obra = await buscarObraRepository(obraId);
  const profesional = await buscarProfesionalRepository(profesionalId);
  if (!obra || !profesional) {
    throw new ReferenciaInexistenteError('No existe la obra o el profesional');
  }
  return asignarProfesionalRepository(obraId, profesionalId, rol);
}''')
  ch=code('''import { asignarProfesionalService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const { profesionalId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarProfesionalService(obraId, profesionalId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El profesional ya está asignado a esa obra' }) };
    }
    throw error;
  }
}''')
 elif idx in (3,4):
  by='obraId' if idx==3 else 'profesionalId';other='profesionalId' if idx==3 else 'obraId'
  fun='listarAsignacionesPor'+('Obra' if idx==3 else 'Profesional')
  nr=nest_repo(name,NA,ACTOR,f'''  {fun}Repository({by}: number) {{
    return this.asignaciones.find({{
      where: {{ {by} }},
      order: {{ {other}: 'ASC' }}
    }});
  }}''')
  ns=code(f'''import {{ Injectable }} from '@nestjs/common';
import {{ {name}Repository }} from './repository';

@Injectable()
export class {name}Service {{
  constructor(private readonly repository: {name}Repository) {{}}

  {fun}Service({by}: number) {{
    return this.repository.{fun}Repository({by});
  }}
}}''')
  route='obras/:obraId/asignaciones' if idx==3 else 'profesionales/:profesionalId/asignaciones'
  nc=code(f'''import {{ Controller, Get, Param }} from '@nestjs/common';
import {{ {name}Service }} from './service';

@Controller('{route}')
export class {name}Controller {{
  constructor(private readonly service: {name}Service) {{}}

  @Get()
  listar(@Param('{by}') {by}: string) {{
    return this.service.{fun}Service(Number({by}));
  }}
}}''')
  query="{ partition: obraId }" if idx==3 else "{ index: 'PorProfesional', partition: profesionalId }"
  opts="\n    .options({ consistent: true })" if idx==3 else ''
  cr=code(f'''import {{ QueryCommand }} from 'dynamodb-toolbox/table/actions/query';
import {{ TABLA_ASIGNACIONES, MODELO_ASIGNACION }} from '../../models/profesional-asignacion.model.mjs';

export async function {fun}Repository({by}) {{
  const {{ Items = [] }} = await TABLA_ASIGNACIONES.build(QueryCommand)
    .entities(MODELO_ASIGNACION)
    .query({query}){opts}
    .send();
  return Items;
}}''')
  cs=code(f'''import {{ {fun}Repository }} from './repository.mjs';

export function {fun}Service({by}) {{
  return {fun}Repository({by});
}}''')
  ch=code(f'''import {{ {fun}Service }} from './service.mjs';

export async function handler(event) {{
  const {by} = Number(event.pathParameters.{by});
  const asignaciones = await {fun}Service({by});
  return {{ statusCode: 200, body: JSON.stringify(asignaciones) }};
}}''')
 elif idx==5:
  nr=nest_repo(name,NA,ACTOR,'''  async modificarRolRepository(obraId: number, profesionalId: number, rol: string) {
    const resultado = await this.asignaciones.update({ obraId, profesionalId }, { rol });
    return resultado.affected;
  }''')
  ns=code('''import { Injectable, NotFoundException } from '@nestjs/common';
import { ModificarRolRepository } from './repository';

@Injectable()
export class ModificarRolService {
  constructor(private readonly repository: ModificarRolRepository) {}

  async modificarRolService(obraId: number, profesionalId: number, rol: string) {
    const modificadas = await this.repository.modificarRolRepository(obraId, profesionalId, rol);
    if (!modificadas) throw new NotFoundException('No existe la asignación');
    return { obraId, profesionalId, rol };
  }
}''')
  nc=code('''import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ModificarRolService } from './service';

@Controller('obras/:obraId/asignaciones/:profesionalId')
export class ModificarRolController {
  constructor(private readonly service: ModificarRolService) {}

  @Patch()
  modificar(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string, @Body() datos: { rol: string }) {
    return this.service.modificarRolService(Number(obraId), Number(profesionalId), datos.rol);
  }
}''')
  cr=code('''import { UpdateItemCommand } from 'dynamodb-toolbox/entity/actions/update';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function modificarRolRepository(obraId, profesionalId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(UpdateItemCommand)
    .item({ obraId, profesionalId, rol })
    .options({
      condition: { attr: 'obraId', exists: true },
      returnValues: 'ALL_NEW'
    })
    .send();
  return Attributes;
}''')
  cs=code('''import { modificarRolRepository } from './repository.mjs';

export function modificarRolService(obraId, profesionalId, rol) {
  return modificarRolRepository(obraId, profesionalId, rol);
}''')
  ch=code('''import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const profesionalId = Number(event.pathParameters.profesionalId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(obraId, profesionalId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}''')
 else:
  nr=nest_repo(name,NA,ACTOR,'''  eliminarAsignacionRepository(obraId: number, profesionalId: number) {
    return this.asignaciones.delete({ obraId, profesionalId });
  }''')
  ns=code('''import { Injectable } from '@nestjs/common';
import { EliminarAsignacionRepository } from './repository';

@Injectable()
export class EliminarAsignacionService {
  constructor(private readonly repository: EliminarAsignacionRepository) {}

  async eliminarAsignacionService(obraId: number, profesionalId: number) {
    await this.repository.eliminarAsignacionRepository(obraId, profesionalId);
  }
}''')
  nc=code('''import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { EliminarAsignacionService } from './service';

@Controller('obras/:obraId/asignaciones/:profesionalId')
export class EliminarAsignacionController {
  constructor(private readonly service: EliminarAsignacionService) {}

  @Delete()
  @HttpCode(204)
  eliminar(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string) {
    return this.service.eliminarAsignacionService(Number(obraId), Number(profesionalId));
  }
}''')
  cr=code('''import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function eliminarAsignacionRepository(obraId, profesionalId) {
  await MODELO_ASIGNACION.build(DeleteItemCommand)
    .key({ obraId, profesionalId })
    .send();
}''')
  cs=code('''import { eliminarAsignacionRepository } from './repository.mjs';

export function eliminarAsignacionService(obraId, profesionalId) {
  return eliminarAsignacionRepository(obraId, profesionalId);
}''')
  ch=code('''import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const profesionalId = Number(event.pathParameters.profesionalId);
  await eliminarAsignacionService(obraId, profesionalId);
  return { statusCode: 204, body: '' };
}''')
 for tech,items in [('nest',{'repository.ts':nr,'service.ts':ns,'controller.ts':nc}),('cloud',{'repository.mjs':cr,'service.mjs':cs,'handler.mjs':ch})]:
  stage=[]
  for path,text in items.items():
   if tech=='cloud' and path=='repository.mjs':text=entity_repository(text)
   (NEST if tech=='nest' else CLOUD)[prefix+path]=text
   stage.append((prefix+path,text))
  casefiles[tech].append(stage)


def module(through):
 text=old
 imports="import { Profesional } from './profesionales/entities/profesional.entity';\nimport { Asignacion } from './asignaciones/entities/asignacion.entity';\n"
 providers=[];controllers=[]
 for c in cases[:through]:
  path=f"./{c['domain']}/{c['slug']}/"
  for kind in ['Repository','Service','Controller']:
   imports+=f"import {{ {c['name']}{kind} }} from '{path+kind.lower()}';\n"
   (controllers if kind=='Controller' else providers).append(c['name']+kind)
 text=imports+text
 text=text.replace('forFeature([Ayuntamiento, Obra])','forFeature([Ayuntamiento, Obra, Profesional, Asignacion])')
 text=text.replace('controllers: [','controllers: ['+', '.join(controllers)+(', ' if controllers else ''))
 text=text.replace('providers: [','providers: ['+', '.join(providers)+(', ' if providers else ''))
 return text

NEW_RESOURCES='''    TablaProfesionales:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: PROFESIONALES_${env:TALLER_EQUIPO}
        # PK: PROFESIONAL_ID. Datos: NOMBRE, APELLIDOS, EMAIL (en Entity).
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - { AttributeName: PROFESIONAL_ID, AttributeType: N }
        KeySchema:
          - AttributeName: PROFESIONAL_ID
            KeyType: HASH  # Partition key: identifica al profesional.

    TablaAsignaciones:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ASIGNACIONES_${env:TALLER_EQUIPO}
        # PK compuesta: OBRA_ID + PROFESIONAL_ID. Dato no clave: ROL.
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - { AttributeName: OBRA_ID, AttributeType: N }
          - { AttributeName: PROFESIONAL_ID, AttributeType: N }
        KeySchema:
          - AttributeName: OBRA_ID
            KeyType: HASH  # Partition key: agrupa las asignaciones de una obra.
          - AttributeName: PROFESIONAL_ID
            KeyType: RANGE # Sort key: distingue al profesional dentro de la obra.
        GlobalSecondaryIndexes:
          - IndexName: PorProfesional
            KeySchema:
              - AttributeName: PROFESIONAL_ID
                KeyType: HASH  # Agrupa las asignaciones del profesional.
              - AttributeName: OBRA_ID
                KeyType: RANGE # Ordena sus obras por ID.
            Projection:
              ProjectionType: INCLUDE
              NonKeyAttributes:
                - ROL # Copia ROL al índice; ambas claves ya se incluyen.
'''
BASE_YAML=CLOUD['serverless.yml']
def yaml_file(through):
 text=BASE_YAML.replace('    TABLA_OBRAS: { Ref: TablaObras }','    TABLA_OBRAS: { Ref: TablaObras }\n    TABLA_PROFESIONALES: { Ref: TablaProfesionales }\n    TABLA_ASIGNACIONES: { Ref: TablaAsignaciones }')
 functions=''
 for c in cases[:through]:
  for name,method,path,handler in c['methods']:
   functions+=f"  {name}:\n    handler: src/{c['domain']}/{c['slug']}/handler.{handler}\n    events:\n      - httpApi: {{ method: {method}, path: '{path}' }}\n"
 text=text.replace('\nresources:', '\n'+functions+'\nresources:')
 return text.rstrip()+'\n\n'+NEW_RESOURCES+'''\n  Outputs:
    ProfesionalesTableName:
      Value: { Ref: TablaProfesionales }
    AsignacionesTableName:
      Value: { Ref: TablaAsignaciones }
'''

NEST['src/taller.module.ts']=module(6);CLOUD['serverless.yml']=yaml_file(6)
SEED=code('''INSERT INTO "PROFESIONAL" ("ID", "NOMBRE", "APELLIDOS", "EMAIL") VALUES
  (1, 'Diego', 'Ruiz López', 'diego.ruiz@example.test'),
  (2, 'Ana', 'Vidal Sanz', 'ana.vidal@example.test')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "ASIGNACION" ("ID_OBRA", "ID_PROFESIONAL", "ROL") VALUES
  (7, 1, 'Electricista'),
  (7, 2, 'Arquitecta'),
  (8, 1, 'Coordinador')
ON CONFLICT ("ID_OBRA", "ID_PROFESIONAL") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"PROFESIONAL"', 'ID'),
              (SELECT MAX("ID") FROM "PROFESIONAL"), true);
SELECT * FROM "ASIGNACION" ORDER BY "ID_OBRA", "ID_PROFESIONAL";''')
NEST['datos-nm.sql']=SEED
# Referencia reproducible desde cero: respeta el estado final del 1:N, sin aplicarlo a una BD existente.
if 'datos-iniciales.sql'in NEST:NEST['datos-iniciales.sql']=NEST['datos-iniciales.sql'].replace("(7, 'Mejora de acera', 3000, 1)", "(7, 'Mejora de acera', 15000, 2)")

profesionales=[dict(profesionalId=1,nombre='Diego',apellidos='Ruiz López',email='diego.ruiz@example.test'),dict(profesionalId=2,nombre='Ana',apellidos='Vidal Sanz',email='ana.vidal@example.test')]
asignaciones=[dict(obraId=7,profesionalId=1,rol='Electricista'),dict(obraId=7,profesionalId=2,rol='Arquitecta'),dict(obraId=8,profesionalId=1,rol='Coordinador')]

def partiql(sql):
 statement='aws dynamodb execute-statement '+chr(92)+'\n  --statement "'+sql.replace('"',chr(92)+'"')+'"'
 if sql.lstrip().upper().startswith('SELECT'):
  statement+=' '+chr(92)+'\n  --consistent-read --output json'
 return statement

seeds=[]
for p in profesionales:
 seeds.append(partiql(f'''INSERT INTO "PROFESIONALES_${{TALLER_EQUIPO}}" VALUE {{'PROFESIONAL_ID':{p['profesionalId']},'NOMBRE':'{p['nombre']}','APELLIDOS':'{p['apellidos']}','EMAIL':'{p['email']}'}}'''))
for a in asignaciones:
 seeds.append(partiql(f'''INSERT INTO "ASIGNACIONES_${{TALLER_EQUIPO}}" VALUE {{'OBRA_ID':{a['obraId']},'PROFESIONAL_ID':{a['profesionalId']},'ROL':'{a['rol']}'}}'''))
CLOUD['cargar-datos-nm.sh']='#!/usr/bin/env bash\nset -e\n'+'\n'.join(seeds)+'\n'
old_seed=[b['code'] for s in OLD['tracks']['cloud'] if s['id']=='datos' for b in s['blocks'][:-1]]
old_seed=[sql.replace("'PRESUPUESTO_EUROS':3000", "'PRESUPUESTO_EUROS':15000").replace("'OBRA_ID':7,'NOMBRE':'Mejora de acera','PRESUPUESTO_EUROS':15000,'AYUNTAMIENTO_ID':1", "'OBRA_ID':7,'NOMBRE':'Mejora de acera','PRESUPUESTO_EUROS':15000,'AYUNTAMIENTO_ID':2") for sql in old_seed]
CLOUD['cargar-datos-1n.sh']='#!/usr/bin/env bash\n# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.\nset -e\n'+'\n'.join(old_seed)+'\n'


chapters=['Entender la N:M','Preparar el proyecto','Cargar los datos']+[c['title'] for c in cases]+['Comprobar y repasar']
tracks={'nest':[],'cloud':[]}

def cues(text,kind):
 specs={
 'repository':[('EntityRepository','Acceso oficial de Toolbox vinculado a la Entity. Los métodos envían la operación; no llevan .send().'),('.get(','Lee un ítem por su clave completa: GetItemCommand.'),('.put(','Guarda el perfil o el vínculo: PutItemCommand.'),('.scan(','Recorre el catálogo de este modelo: ScanCommand.'),('.query(','Consulta una partición de la tabla o de su índice: QueryCommand.'),('.update(','Modifica datos sin cambiar las claves: UpdateItemCommand.'),('.delete(','Elimina únicamente el ítem de esa clave: DeleteItemCommand.'),('obraId','Identifica la obra de la asociación.'),('profesionalId','Identifica al profesional. El par completo identifica la asignación.'),('rol','Es un dato del vínculo; puede cambiar según la obra.'),('PorProfesional','Usa la segunda organización de los mismos vínculos.'),('insert','INSERT rechaza una pareja cuya PK compuesta ya existe.'),('find','Lee las asignaciones con el filtro de este caso.'),('update','La condición utiliza ambos IDs; el dato modificado es ROL.'),('delete','Elimina la fila de ASIGNACION; conserva las filas principales.')],
 'service':[('obraId','Este valor llega desde la ruta de la petición.'),('profesionalId','Este valor viaja hasta el Repository sin perder la otra clave.'),('await','Espera el resultado antes de seguir o devolverlo.'),('return','La respuesta vuelve a la capa que llamó al Service.'),('rol','El mismo profesional puede tener otro rol en otra obra.')],
 'entry':[('event.pathParameters','Lambda recibe aquí los parámetros de ruta.'),('JSON.parse(event.body)','El cuerpo HTTP es texto JSON y aquí se convierte en objeto.'),('@Param','Nest extrae este valor de la ruta.'),('@Body','Nest obtiene las propiedades del cuerpo JSON.'),('obraId','Primera parte de la clave compuesta.'),('profesionalId','Segunda parte de la clave compuesta.'),('statusCode','Indica el resultado HTTP de la operación.'),('JSON.stringify','Convierte el resultado JavaScript en texto JSON para responder.')],
 'model':[("'ID_OBRA'",'Nombre de la columna SQL que referencia OBRA.'),("'ID_PROFESIONAL'",'Nombre de la columna SQL que referencia PROFESIONAL.'),('PrimaryColumn','Ambas PrimaryColumn forman una sola clave primaria compuesta.'),('ManyToOne','Cada asignación pertenece a una obra y a un profesional.'),("'NOMBRE'",'Nombre y apellidos se guardan por separado.'),("'APELLIDOS'",'Apellido del profesional.'),("'EMAIL'",'Correo del profesional.'),('OneToMany','Colección de vínculos asociados a este registro.'),('PrimaryGeneratedColumn','PostgreSQL genera el ID del nuevo profesional.')],
 'table':[('partitionKey','Describe cómo se agrupan los ítems.'),('sortKey','Distingue los ítems dentro de una partición.'),('PorProfesional','Nombre exacto del índice creado por el YAML.'),("'global'",'El índice utiliza una partition key distinta de la tabla.'),('documentClient','Cliente que enviará las operaciones a DynamoDB.')],
 'entity':[('MODELO_PROFESIONAL','Describe el perfil, con nombre, apellidos y correo.'),('MODELO_ASIGNACION','Describe un vínculo con dos claves y un rol.'),("savedAs('OBRA_ID')",'obraId se guarda con este nombre físico.'),("savedAs('PROFESIONAL_ID')",'profesionalId se guarda con este nombre físico.'),("savedAs('ROL')",'ROL es el dato de esta asociación.'),('entityAttribute: false','Toolbox no añade su etiqueta interna de entidad.'),('timestamps: false','Toolbox no añade fechas automáticas.')],
 'yaml':[('TABLA_PROFESIONALES','Nombre que el entorno de Lambda entrega a Table.'),('TablaAsignaciones','Recurso que crea la nueva tabla.'),('KeyType: HASH','Partition key; no significa autonumérico.'),('KeyType: RANGE','Sort key. Junto a HASH identifica el ítem.'),('PorProfesional','Índice inverso que DynamoDB mantiene al escribir.'),('ProjectionType: INCLUDE','Copia al índice las claves y ROL.'),('ROL','Dato de ASIGNACIONES que también devuelve el índice.')],
 'module':[('Profesional','Entidad del perfil del profesional.'),('Asignacion','Entidad intermedia con PK compuesta.'),('forFeature','Registra las Entities que se inyectan en los repositories.'),('controllers','Puntos de entrada HTTP de los casos ya preparados.'),('providers','Services y repositories que Nest debe poder inyectar.')],
 'command':[('curl','Envía la petición HTTP al proyecto real.'),('API_URL','Dirección de la API que vas a consultar.'),('POST','Da de alta un registro o una asociación.'),('PATCH','Modifica únicamente el dato que envías.'),('DELETE','Elimina el vínculo identificado por la ruta.'),('fileb://','AWS CLI lee los bytes del fichero JSON directamente.'),('pathParameters','Reproduce los parámetros que recibiría el handler por HTTP.'),('body','Contiene el cuerpo JSON de la petición, como texto.')],
 'seed':[("'PROFESIONAL'",'Prepara el catálogo de perfiles.'),('ID_OBRA','Un mismo ID de obra puede repetirse.'),('ID_PROFESIONAL','Un mismo profesional puede aparecer en varias obras.'),('ON CONFLICT','No sobrescribe los vínculos que ya existen.'),('setval','Coloca la secuencia detrás del mayor ID que acabas de cargar.'),('ROL','La responsabilidad pertenece a este vínculo.')]
 }
 found=[]
 for token,note in specs.get(kind,[]):
  start=text.find(token)
  if start>=0 and not any(start < x['end'] and start+len(token)>x['start'] for x in found):found.append(dict(token=token,start=start,end=start+len(token),note=note))
  if len(found)==5:break
 return found

def add(tech,ch,slug,title,kind,text='',path='',note='',expect='',focus='model',create=None):
 stage=dict(id=slug,chapter=ch,title=title,kind=kind,code=text,path=path,note=note,expect=expect,focus=focus,cues=cues(text,kind),create=create)
 if kind in ['logical','mapping']:
  tokens=['ID_OBRA','ID_PROFESIONAL','ROL'] if kind=='logical' else ['OBRA_ID','PROFESIONAL_ID','ROL']
  notes=['Primera parte de la PK: identifica la obra.','Segunda parte de la PK: identifica al profesional dentro de la obra.','Dato del vínculo, no del profesional.']
  stage['cues']=[dict(token=token,start=text.index(token),end=text.index(token)+len(token),note=note) for token,note in zip(tokens,notes)]
 if kind in ['model','table','entity','repository','service','entry','module','yaml','seed'] and path:
  parent=str(Path(path).parent);stage['create']=(f'mkdir -p {parent}\nls -d {parent}\n' if parent!='.' else '')+f'touch {path}\ncode {path}'
 tracks[tech].append(stage)
 return stage

for t in tracks:
 add(t,0,'situacion','Una persona, varias obras; una obra, varias personas','story',expect='Obra 7: profesionales 1 y 2. Profesional 1: obras 7 y 8. El rol cambia con la pareja.')
 add(t,0,'logico','Lee el esquema lógico aprobado','logical','ASIGNACION (ID_OBRA, ID_PROFESIONAL, ROL)',note='PK subrayadas y FK conectadas a la tabla que referencian. La asociación no lleva un ID autonumérico.',expect='La PK de ASIGNACION es (ID_OBRA, ID_PROFESIONAL). Los dos campos son también FK.')
 add(t,0,'nosql','La misma relación en DynamoDB','mapping','ASIGNACIONES (OBRA_ID, PROFESIONAL_ID, ROL)',expect='ASIGNACIONES agrupa por OBRA_ID. PorProfesional agrupa por PROFESIONAL_ID; ambos conservan las mismas parejas.')
 start=('# Abre una terminal en la carpeta de tu backend Nest.\npwd\nls package.json src\ncurl -i http://localhost:3000/salud\ncurl -i http://localhost:3000/obras' if t=='nest' else '# Abre una terminal en la carpeta de tu backend Serverless.\npwd\nls package.json serverless.yml src\naws sts get-caller-identity\nprintf \'Equipo: %s\\nAPI: %s\\n\' "$TALLER_EQUIPO" "$API_URL"\ncurl -i "$API_URL/salud"\ncurl -i "$API_URL/obras"')
 project_note=('Abre en VS Code la carpeta de tu proyecto Nest 1:N, donde están package.json y src. Después abre Terminal → Nueva terminal. Conserva el nombre y la ubicación que elegiste para tu proyecto. Nest debe estar arrancado en otra terminal.' if t=='nest' else 'Sitúa la terminal en la carpeta de tu proyecto Serverless 1:N, donde están package.json, serverless.yml y src. En VS Code o Codespaces puedes abrir esa carpeta en el terminal integrado. Conserva el nombre y la ubicación de tu proyecto y recupera las variables AWS_PROFILE, AWS_REGION, TALLER_EQUIPO y API_URL de tu despliegue.')
 resume=add(t,1,'retomar','Retoma tu proyecto 1:N','command',start,note=project_note+' Si partes de cero, usa Abrir preparación 1:N y completa sus modelos y cinco casos antes de ampliar. Si tu proyecto está en otro ordenador, clona tu propio repositorio y abre la carpeta del backend. Continúa sobre esa copia.',expect='pwd muestra la carpeta real de tu backend y ls encuentra sus archivos. La API responde y conserva las obras 7, 8 y 9. En el estado final del 1:N, la obra 7 tiene presupuesto 15000 y ayuntamiento 2.')
 if t=='nest':
  resume['note']='Tu proyecto base 1:N ya está preparado: conserva sus dependencias, configuración, tablas y datos. Abre su carpeta real en VS Code. Aquí solo vas a ejecutarlo y comprobar que sigue funcionando antes de añadir la N:M. Si Nest ya está en marcha, deja esa terminal abierta y pasa directamente a las pruebas del bloque 2.'
  resume['runbook']=[
   dict(title='1 · Ejecuta tu proyecto base',terminal='Terminal 1 · carpeta real de tu backend',instruction='Abre Terminal → Nueva terminal dentro de tu backend. PostgreSQL debe estar encendido; si está detenido, inicia el servidor que ya utilizabas en 1:N. Ejecuta npm run build para compilar el código existente y, cuando termine sin errores, npm run start para ejecutarlo con su configuración actual.',code='npm run build\nnpm run start',expect='Ves «Nest application successfully started». La Terminal 1 queda ocupada atendiendo peticiones: es normal. Déjala abierta y continúa en otra terminal.')
  ]
  resume['commandTitle']='2 · Terminal 2 · Comprueba el proyecto que ya funciona'
  resume['commandIntro']='Sin cerrar la Terminal 1, abre Terminal → Nueva terminal en VS Code y sitúate en la misma carpeta del backend. Ejecuta estas pruebas en la Terminal 2. Usa el puerto de tu .env si no es 3000.'
  resume['code']='# Terminal 2 · misma carpeta del backend.\npwd\ncurl -i http://localhost:3000/salud\ncurl -i http://localhost:3000/obras'
  resume['cues']=cues(resume['code'],'command')
  resume['expect']='Terminal 1: Nest sigue ejecutándose. Terminal 2: /salud devuelve HTTP 200 y la base conectada; /obras devuelve HTTP 200 con tus obras. Se conservan las obras 7, 8 y 9, y la obra 7 mantiene presupuesto 15000 y ayuntamiento 2.'
 if t=='nest':
  for slug,title,path,text in [('profesional','Crea Profesional','src/profesionales/entities/profesional.entity.ts',PROF_DRAFT),('asignacion','Crea Asignacion y su clave compuesta','src/asignaciones/entities/asignacion.entity.ts',ASIG_DRAFT),('obra-inversa','Conecta Obra con sus asignaciones','src/obras/entities/obra.entity.ts',OBRA),('prof-inversa','Conecta Profesional con sus asignaciones','src/profesionales/entities/profesional.entity.ts',PROF),('asig-inversas','Completa ambos extremos de Asignacion','src/asignaciones/entities/asignacion.entity.ts',ASIG)]:
   add(t,1,slug,title,'model',text,path,note='Copia el archivo completo. Las inversas se añaden cuando ya existe Asignacion. Compila cuando hayas terminado de registrar los modelos.',expect='Cada asignación tiene una obra, un profesional y un ROL; se conserva Obra.ayuntamiento.')
  add(t,1,'registrar','Registra las cuatro Entities','module',module(0),'src/taller.module.ts',expect='El módulo conserva todos los casos 1:N. Solo añade las nuevas Entities; aún no importa casos N:M.')
  add(t,1,'arrancar','Compila y arranca con los nuevos modelos','command','npm run build\nnpm run start',note='Terminal 1: detén antes Nest con Ctrl+C. La base de práctica utiliza synchronize para añadir las tablas. No borres las tablas anteriores.',expect='Nest arranca sin imports inexistentes y PostgreSQL contiene PROFESIONAL y ASIGNACION.')
  add(t,2,'datos','Carga los tres vínculos de partida','seed',SEED,'datos-nm.sql',expect='Tres filas: (7,1), (7,2), (8,1). Los dos profesionales tienen nombre, apellidos y email.')
  add(t,2,'cargar','Ejecuta el SQL y mira las dos direcciones','command',code('''psql -h localhost -p 5432 -U postgres -d control_databridge -W -v ON_ERROR_STOP=1 -f datos-nm.sql
psql -h localhost -p 5432 -U postgres -d control_databridge -W -c 'SELECT * FROM "ASIGNACION" WHERE "ID_OBRA" = 7 ORDER BY "ID_PROFESIONAL";'
psql -h localhost -p 5432 -U postgres -d control_databridge -W -c 'SELECT * FROM "ASIGNACION" WHERE "ID_PROFESIONAL" = 1 ORDER BY "ID_OBRA";' '''),expect='Cada consulta devuelve dos filas; son distintas agrupaciones de los mismos tres vínculos.')
 else:
  add(t,1,'infra','Añade las dos tablas sin reemplazar las anteriores','yaml',yaml_file(0),'serverless.yml',note='Archivo acumulativo completo. env:TALLER_EQUIPO lee directamente la variable que has exportado en la terminal; si vale equipo01, ASIGNACIONES_${env:TALLER_EQUIPO} se convierte en ASIGNACIONES_equipo01. Los campos NOMBRE, APELLIDOS, EMAIL y ROL se declaran en Entity; AttributeDefinitions solo contiene claves. NonKeyAttributes copia ROL al índice.',expect='Cuatro tablas, las rutas 1:N originales y ninguna función N:M todavía.')
  add(t,1,'table','Describe Table y el índice PorProfesional','table',TABLES,'src/models/profesional-asignacion.model.mjs',expect='La tabla agrupa por obra; el índice agrupa por profesional. Ninguna Table crea recursos AWS.')
  add(t,1,'entity','Completa las dos Entities de Toolbox','entity',MODELS,'src/models/profesional-asignacion.model.mjs',note='En los repositories partirás siempre de MODELO.build(EntityRepository). Cada método get, put, scan, query, update o delete envía su operación y devuelve la respuesta; no añadas .send(). Table permanece dentro del modelo.',expect='Todos los campos del esquema están presentes. Los dos .key() de Asignacion corresponden a PK y SK de Table.')
  add(t,1,'desplegar','Crea los recursos con Serverless','command','npm run package\nnpm run deploy\nnpm run info',note='Misma terminal y sesión de Academy que en 1:N. Conserva AWS_PROFILE, AWS_REGION, TALLER_EQUIPO y LAMBDA_ROLE_ARN. Serverless 3.40.0 local; no hay nuevo login ni rol.',expect='Despliegue terminado. Las cuatro tablas existen y la API 1:N sigue respondiendo.')
  add(t,2,'datos','Carga los profesionales y las asignaciones','command','\n'.join(seeds),note='Terminal de tu proyecto Serverless, en la carpeta que contiene serverless.yml. Ejecuta las altas una sola vez; DuplicateItem indica que ese dato ya existe. No borres ni sobrescribas tus datos.',expect='Dos profesionales y las tres parejas de la ficha, con nombre, apellidos, email y rol.')
  add(t,2,'leer-datos','Lee las asignaciones con PartiQL','command',partiql('SELECT * FROM "ASIGNACIONES_${TALLER_EQUIPO}"')+'\n'+partiql('SELECT * FROM "PROFESIONALES_${TALLER_EQUIPO}"'),expect='Se ven tres vínculos y dos perfiles. En la salida CLI, N indica número y S texto.')

for t in tracks:
 for idx,c in enumerate(cases,1):
  chapter=idx+2
  for path,text in casefiles[t][idx-1]:
   kind='entry' if path.endswith(('handler.mjs','controller.ts')) else 'service' if 'service.' in path else 'repository'
   title={'repository':'Prepara el Repository','service':'Conecta el Service','entry':'Recibe la petición en '+('Controller' if t=='nest' else 'Handler')}[kind]
   add(t,chapter,c['slug']+'-'+kind,title,kind,text,path,note='El archivo está completo: imports, métodos y cierres. '+('Siempre partimos de la Entity con build(EntityRepository). get/put/scan/query/update/delete ya envían la operación, sin .send(). ' if t=='cloud' else '')+('En esta asociación se comprueba que existan ambos extremos y se rechaza una pareja duplicada.' if idx==2 else 'Los dos IDs identifican una sola asignación.'),expect=c['expect'],focus=kind)
  add(t,chapter,c['slug']+'-registro','Registra el caso y conserva los anteriores','module' if t=='nest' else 'yaml',module(idx) if t=='nest' else yaml_file(idx),'src/taller.module.ts' if t=='nest' else 'serverless.yml',expect='Solo se registran archivos que ya has creado; siguen disponibles las rutas anteriores.',focus='route')
  add(t,chapter,c['slug']+'-ejecutar','Aplica los archivos en tu proyecto','command','npm run build\nnpm run start' if t=='nest' else 'npm run deploy',note='En Nest usa Terminal 1 (detén el proceso anterior). Las peticiones van en Terminal 2. En Serverless despliega después de guardar los archivos.',expect='La aplicación arranca o despliega sin handlers ni imports inexistentes.',focus='request')
  api='http://localhost:3000' if t=='nest' else '$API_URL'
  if idx==1:
   cmd=f'''curl -i -X POST "{api}/profesionales" \\
  -H 'Content-Type: application/json' \\
  -d '{json.dumps(c['request'],ensure_ascii=False,separators=(',',':'))}'
curl -i "{api}/profesionales"'''
   event={'body':json.dumps(c['request'],ensure_ascii=False)}
  else:
   path=c['methods'][0][2].replace('{obraId}','8' if idx==2 else '7').replace('{profesionalId}','1')
   cmd=f'curl -i -X {c["methods"][0][1]} "{api}{path}"'
   if c.get('request'):cmd+=" \\\n  -H 'Content-Type: application/json' \\\n  -d '"+json.dumps(c['request'],ensure_ascii=False,separators=(',',':'))+"'"
   event={'pathParameters':{k:('8' if idx==2 else '7') if k=='obraId' else '1' for k in re.findall(r'{(\w+)}',c['methods'][0][2])}}
   if idx==4:event={'pathParameters':{'profesionalId':'1'}}
   if c.get('request'):event['body']=json.dumps(c['request'],ensure_ascii=False)
  add(t,chapter,c['slug']+'-curl','Prueba con curl','command',cmd,note=('API_URL debe contener la URL real de tu HTTP API. ' if t=='cloud' else 'Terminal 2; Nest debe seguir abierto en la Terminal 1. ')+('Los listados de vínculos muestran IDs y ROL; no hacen un JOIN automático con los nombres. ' if idx in (3,4) else '')+('El índice es eventualmente consistente; repite la lectura si acabas de escribir.' if idx==4 else ''),expect=c['expect'],focus='response')
  if t=='cloud':
   eventpath=f"peticiones/nm-{idx}.json"
   add(t,chapter,c['slug']+'-evento','Prepara el mismo evento para Invoke','command',json.dumps(event,ensure_ascii=False,indent=2),eventpath,note='Este bloque es el contenido del fichero JSON, no un comando Bash. body contiene texto JSON y pathParameters reproduce la ruta HTTP. Conserva ese contrato.',expect='El mismo handler puede recibir este evento aunque no intervenga API Gateway.',focus='request',create=f'mkdir -p peticiones\nls -d peticiones\ntouch {eventpath}\ncode {eventpath}')
   CLOUD[eventpath]=json.dumps(event,ensure_ascii=False,indent=2)+'\n'
   add(t,chapter,c['slug']+'-invoke','Invoca el mismo handler desde la terminal','command',f'''aws lambda invoke \\
  --function-name "taller-ch22-${{TALLER_EQUIPO}}-{c['methods'][0][0]}" \\
  --payload fileb://{eventpath} \\
  respuesta-nm.json
cat respuesta-nm.json''',note='AWS CLI usa AWS_PROFILE y AWS_REGION de tu terminal. fileb:// lee los bytes del JSON; no necesitas escribir opciones de base64. En POST usa curl o Invoke para crear, no ambos seguidos: el segundo sería otra alta o un duplicado. En DELETE la segunda llamada es idempotente.',expect=c['expect'],focus='response')
 # Comprobación final de persistencia.
 verify=("psql -h localhost -p 5432 -U postgres -d control_databridge -W -c 'SELECT * FROM \"ASIGNACION\" ORDER BY \"ID_OBRA\", \"ID_PROFESIONAL\";'" if t=='nest' else partiql('SELECT * FROM "ASIGNACIONES_${TALLER_EQUIPO}"'))
 add(t,9,'persistencia','Comprueba qué cambió y qué se conserva','command',verify,expect='Tras los seis casos quedan (7,2), (8,1) y (8,2). Permanecen obras y profesionales, y la relación 1:N anterior.',focus='response')
 add(t,9,'repaso','Repasa las claves y compara las dos tecnologías','review',expect='Puedes explicar la PK compuesta, las dos lecturas, el índice y la diferencia entre borrar el vínculo y borrar un extremo.')

# Persistir las referencias completas. Las fases del cuaderno se generan desde los mismos textos.
D=dict(version=1,unit='nm',caseId='CH-22',title='Obras y profesionales · relación N:M',chapters=chapters,tracks=tracks,cases=cases,profesionales=profesionales,asignaciones=asignaciones,baseline={'obras':[7,8,9],'obra7':{'presupuestoEuros':15000,'ayuntamientoId':2}})
from nest_sencillo import apply_nm
apply_nm(D,NEST)
from version_estudio import nm
nm(D,NEST,CLOUD)
for tech,files in [('nest',NEST),('cloud',CLOUD)]:
 dest=OUT/'codigo'/tech
 if tech=='nest':
  # La referencia generada es completa: retirar clases antiguas que ya no se usan.
  for stale in [*dest.rglob('*.ts'),*dest.glob('datos-*.sql')]:
   if str(stale.relative_to(dest))not in files:stale.unlink()
 for path,text in files.items():write(dest/path,text)
logical=ROOT.parent/'output/preview/nm-ayuntamiento/esquema-logico.svg'
OUT.mkdir(exist_ok=True)
shutil.copyfile(logical,OUT/'esquema-logico.svg')
write(OUT/'CH-22.json',json.dumps(D,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'steps':{t:len(v) for t,v in tracks.items()},'files':{'nest':len(NEST),'cloud':len(CLOUD)}}))
