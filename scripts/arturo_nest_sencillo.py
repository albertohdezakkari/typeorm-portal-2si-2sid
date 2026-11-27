"""Piloto docente exclusivo CH-22: Entities -> Service -> Controller.

El repositorio de TypeORM se inyecta en el Service. No se generan clases
Repository propias ni un Controller/Service distinto para cada operación.
Los otros contextos y todo el recorrido Serverless conservan su versión.
"""
from copy import deepcopy
import json
import hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SERVICE_PATH='src/obras/obras.service.ts'
CONTROLLER_PATH='src/obras/obras.controller.ts'

SERVICE_HEADER="""import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';

@Injectable()
export class ObrasService {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>,
    @InjectRepository(Ayuntamiento) private readonly ayuntamientos: Repository<Ayuntamiento>
  ) {}
"""
SERVICE_METHODS=["""
  crearObra(nombre: string, presupuestoEuros: number, ayuntamientoId: number) {
    const obra = this.obras.create({
      nombre,
      presupuestoEuros,
      ayuntamiento: { id: ayuntamientoId }
    });
    return this.obras.save(obra);
  }

  listarObras() {
    return this.obras.find({ order: { id: 'ASC' } });
  }
""", """
  async eliminarObra(obraId: number) {
    await this.obras.delete(obraId);
  }
""", """
  async modificarPresupuesto(obraId: number, presupuestoEuros: number) {
    await this.obras.update(obraId, { presupuestoEuros });
    return this.obras.findOneBy({ id: obraId });
  }
""", """
  async cambiarAyuntamiento(obraId: number, ayuntamientoId: number) {
    await this.obras.update(obraId, { ayuntamiento: { id: ayuntamientoId } });
    return this.obras.findOneBy({ id: obraId });
  }
""", """
  async consultarAyuntamiento(ayuntamientoId: number, minimo: number) {
    const ayuntamiento = await this.ayuntamientos.findOneBy({ id: ayuntamientoId });
    const obras = await this.obras.find({
      where: {
        ayuntamiento: { id: ayuntamientoId },
        presupuestoEuros: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { ayuntamiento, obras };
  }
"""]
CONTROLLER_METHODS=["""
  @Post('obras')
  crear(@Body() datos: { nombre: string; presupuestoEuros: number; ayuntamientoId: number }) {
    return this.service.crearObra(datos.nombre, datos.presupuestoEuros, datos.ayuntamientoId);
  }

  @Get('obras')
  listar() {
    return this.service.listarObras();
  }
""", """
  @Delete('obras/:obraId')
  @HttpCode(204)
  eliminar(@Param('obraId') obraId: string) {
    return this.service.eliminarObra(Number(obraId));
  }
""", """
  @Patch('obras/:obraId')
  modificar(@Param('obraId') obraId: string, @Body() datos: { presupuestoEuros: number }) {
    return this.service.modificarPresupuesto(Number(obraId), datos.presupuestoEuros);
  }
""", """
  @Patch('obras/:obraId/ayuntamiento')
  cambiarAyuntamiento(@Param('obraId') obraId: string, @Body() datos: { ayuntamientoId: number }) {
    return this.service.cambiarAyuntamiento(Number(obraId), datos.ayuntamientoId);
  }
""", """
  @Get('ayuntamientos/:ayuntamientoId/obras')
  consultar(@Param('ayuntamientoId') ayuntamientoId: string, @Query('minimo') minimo = '0') {
    return this.service.consultarAyuntamiento(Number(ayuntamientoId), Number(minimo));
  }
"""]

def service_code(through):
    text=SERVICE_HEADER+''.join(SERVICE_METHODS[:through])+'}\n'
    if through<5:text=text.replace('MoreThanOrEqual, ','')
    return text.rstrip()

def controller_code(through):
    decorators=['Body','Controller','Get','Post']
    if through>=2:decorators+=['Delete','HttpCode','Param']
    if through>=3:decorators+=['Patch']
    if through>=5:decorators+=['Query']
    return ("import { "+', '.join(decorators)+" } from '@nestjs/common';\nimport { ObrasService } from './obras.service';\n\n@Controller()\nexport class ObrasController {\n  constructor(private readonly service: ObrasService) {}\n"+''.join(CONTROLLER_METHODS[:through])+'}').rstrip()

def module_code(through=0,nm_entities=False,nm_cases=0):
    imports=["import { Module } from '@nestjs/common';","import { TypeOrmModule } from '@nestjs/typeorm';","import { Ayuntamiento } from './ayuntamientos/entities/ayuntamiento.entity';","import { Obra } from './obras/entities/obra.entity';"]
    entities=['Ayuntamiento','Obra'];controllers=[];providers=[]
    if through:
        imports += ["import { ObrasService } from './obras/obras.service';","import { ObrasController } from './obras/obras.controller';"]
        controllers+=['ObrasController'];providers+=['ObrasService']
    if nm_entities:
        for name,route in [('Profesional','profesionales'),('Asignacion','asignaciones')]:
            imports.append(f"import {{ {name} }} from './{route}/entities/{name.lower()}.entity';");entities.append(name)
    for bound,name,route in [(1,'Profesionales','profesionales'),(2,'Asignaciones','asignaciones')]:
        if nm_cases>=bound:
            for kind in ['Service','Controller']:imports.append(f"import {{ {name}{kind} }} from './{route}/{route}.{kind.lower()}';")
            controllers.append(name+'Controller');providers.append(name+'Service')
    return '\n'.join(imports)+"\n\n@Module({\n  imports: [TypeOrmModule.forFeature(["+', '.join(entities)+"])],\n  controllers: ["+', '.join(controllers)+"],\n  providers: ["+', '.join(providers)+"]\n})\nexport class TallerModule {}"


def cues(code,specs):
    result=[]
    for token,title,note in specs:
        assert token in code,token
        result.append(dict(text=token,title=title,note=note))
    return result

SERVICE_CUES=[
 [('this.obras.create({','Preparar el objeto','create prepara una Obra en memoria; todavía no la guarda.'),('ayuntamiento: { id: ayuntamientoId }','Usar la relación','El ID recibido se guarda en ID_AYUNTAMIENTO mediante la relación de Obra.'),('this.obras.save(obra)','Guardar la obra','save escribe la fila y devuelve la Obra con el ID generado por PostgreSQL.'),("this.obras.find({ order: { id: 'ASC' } })",'Listar las obras','find lee las filas usando la Entity; order las ordena por ID.')],
 [('async eliminarObra(obraId: number)','Recibir el ID','El Controller convierte el parámetro de la ruta en número y lo entrega aquí.'),('await this.obras.delete(obraId)','Eliminar solo esa obra','delete utiliza su clave primaria. await espera a que termine antes de responder.')],
 [('async modificarPresupuesto(obraId: number, presupuestoEuros: number)','Dos valores recibidos','El ID viene de la ruta y el presupuesto del cuerpo JSON.'),('this.obras.update(obraId, { presupuestoEuros })','Cambiar un campo','update selecciona la obra por ID y modifica solo presupuestoEuros.'),('return this.obras.findOneBy({ id: obraId })','Leer lo actualizado','findOneBy busca una obra cuyo id coincide. return la devuelve al Controller.')],
 [('async cambiarAyuntamiento(obraId: number, ayuntamientoId: number)','ID de la obra y nuevo ayuntamiento','Se reciben dos IDs con funciones diferentes: la fila que cambia y su nueva referencia.'),('this.obras.update(obraId, { ayuntamiento: { id: ayuntamientoId } })','Cambiar la relación','La propiedad ayuntamiento está declarada en Obra. TypeORM actualiza ID_AYUNTAMIENTO.'),('return this.obras.findOneBy({ id: obraId })','Devolver la obra','El resultado vuelve al Controller y Nest lo convierte en JSON.')],
 [('this.ayuntamientos.findOneBy({ id: ayuntamientoId })','Leer el ayuntamiento','Se obtiene el registro principal por su ID.'),('ayuntamiento: { id: ayuntamientoId }','Filtrar por la relación','Solo se leen las obras que pertenecen al ayuntamiento solicitado.'),('presupuestoEuros: MoreThanOrEqual(minimo)','Presupuesto mayor o igual','MoreThanOrEqual equivale a >= en SQL. minimo viene de la consulta de la URL.'),('return { ayuntamiento, obras }','Preparar la respuesta','El objeto contiene el ayuntamiento y la lista de obras que cumplen el filtro.')]
]
CONTROLLER_CUES=[
 [("@Post('obras')",'Ruta de creación','POST /obras ejecuta el método crear.'),('@Body() datos:','Leer el cuerpo JSON','Nest coloca en datos las propiedades nombre, presupuestoEuros y ayuntamientoId.'),('this.service.crearObra(datos.nombre, datos.presupuestoEuros, datos.ayuntamientoId)','Llamar al mismo Service','El Controller entrega los tres valores. La lógica y la escritura están en ObrasService.'),("@Get('obras')",'Ruta del listado','GET /obras llama a listarObras en ese mismo Service.')],
 [("@Delete('obras/:obraId')",'ID en la ruta','DELETE /obras/10 proporciona obraId = "10".'),('@HttpCode(204)','Respuesta sin contenido','Cuando termina el borrado, Nest responde con HTTP 204.'),('this.service.eliminarObra(Number(obraId))','Enviar un número al Service','Number convierte el texto de la ruta. No se escribe SQL en el Controller.')],
 [("@Patch('obras/:obraId')",'Ruta de modificación','PATCH /obras/7 identifica la obra que se quiere modificar.'),('@Body() datos: { presupuestoEuros: number }','Nuevo presupuesto','El cuerpo JSON aporta presupuestoEuros.'),('this.service.modificarPresupuesto(Number(obraId), datos.presupuestoEuros)','Entregar los dos valores','La ruta aporta el ID y el cuerpo aporta el dato que cambiará.')],
 [("@Patch('obras/:obraId/ayuntamiento')",'Cambiar la asociación','La ruta expresa qué obra cambiará de ayuntamiento.'),('@Body() datos: { ayuntamientoId: number }','Nueva referencia','El cuerpo lleva el ID del ayuntamiento de destino.'),('this.service.cambiarAyuntamiento(Number(obraId), datos.ayuntamientoId)','Continuar en el Service','Usamos el mismo ObrasService; no creamos otra clase para esta operación.')],
 [("@Get('ayuntamientos/:ayuntamientoId/obras')",'Ruta de la relación','GET /ayuntamientos/2/obras solicita las obras del ayuntamiento 2.'),("@Query('minimo') minimo = '0'",'Filtro opcional','?minimo=12001 llega como texto; si no se envía, se usa 0.'),('this.service.consultarAyuntamiento(Number(ayuntamientoId), Number(minimo))','Dos números al Service','El Service consulta las Entities y devuelve el resultado.')]
]


def apply_training(data):
    if data['context']['id']!='CH-22':return data
    old=deepcopy(data['steps']['nest']);original=deepcopy(data.get('originalSource',data['source']))
    result=deepcopy(old[:5])
    result[4].update(code=module_code(),exact=False)
    result[4]['cues']=cues(result[4]['code'],[("import { Ayuntamiento }",'Importar Ayuntamiento','Es la clase que acabas de preparar.'),("import { Obra }",'Importar Obra','El módulo reúne las dos Entities.'),('TypeOrmModule.forFeature([Ayuntamiento, Obra])','Preparar las dos Entities','Permite inyectar sus repositorios de TypeORM. Todavía no hay Service ni Controller registrados.')])
    base=dict(chapter=0,name='Conectar el Service',path=SERVICE_PATH,code=service_code(0),page=2,exact=False,scene='nest-binding')
    base['cues']=cues(base['code'],[('@Injectable()','Un Service de Nest','Nest podrá crear esta clase y entregársela al Controller.'),('@InjectRepository(Obra) private readonly obras: Repository<Obra>','Recibir el repositorio de Obra','obras ofrece las operaciones de TypeORM sobre la Entity Obra; no es una clase Repository que tengamos que crear.'),('@InjectRepository(Ayuntamiento) private readonly ayuntamientos: Repository<Ayuntamiento>','Recibir el de Ayuntamiento','Este segundo repositorio permitirá leer el registro principal.')])
    result.append(base)
    for chapter in range(1,6):
        for name,path,code,spec in [('Service',SERVICE_PATH,service_code(chapter),SERVICE_CUES[chapter-1]),('Controller',CONTROLLER_PATH,controller_code(chapter),CONTROLLER_CUES[chapter-1])]:
            explained=cues(code,spec)
            if name=='Service' and chapter>=2:
                for cue in explained:cue['after']=spec[0][0]
            result.append(dict(chapter=chapter,name=name,path=path,code=code,cues=explained,page=3 if name=='Controller'else 4,exact=False,scene='service'if name=='Service'else'entry'))
        if chapter==1:
            code=module_code(1);result.append(dict(chapter=1,name='Registrar Service y Controller',path='src/taller.module.ts',code=code,cues=cues(code,[('controllers: [ObrasController]','Un Controller','Este Controller contiene las rutas de obras.'),('providers: [ObrasService]','Un Service','Nest entrega ObrasService al Controller por su constructor.')]),page=3,exact=False,scene='nest-module'))
        check=deepcopy(next(s for s in old if s['chapter']==chapter and s['scene']=='result'))
        result.append(check)
    data['steps']['nest']=result
    data['originalSource']=original;data['source']={**original,'kind':'pilot','label':'Arturo · versión sencilla'}
    data['nestSimpleRevision']=1
    data.setdefault('legacyNestChapters',[s['chapter']for s in old])
    data['nestSimpleFiles']={'service':SERVICE_PATH,'controller':CONTROLLER_PATH}
    methods=['crearObra','eliminarObra','modificarPresupuesto','cambiarAyuntamiento','consultarAyuntamiento']
    for op,method in zip(data['operations'],methods):op['nestMethod']=method
    for s in result:
        for cue in s['cues']:assert cue['text']in s['code']
    return data


def apply_preparation(data,training):
    if not training.get('nestSimpleRevision'):return data
    data['nestSimpleRevision']=1
    for phase in data['tracks']['nest']:
        if phase['id'].startswith('caso-'):
            phase['lead']='Añade el método de este caso al mismo Service y al mismo Controller. Copia cada archivo completo y guarda; conserva los métodos anteriores.'
            phase['nodes']=['Petición','Controller','Service','Entities / PostgreSQL']
            if phase['id']!='caso-1':phase['blocks']=[b for b in phase['blocks']if b.get('path')!='src/taller.module.ts']
        for b in phase['blocks']:
            if b.get('path')==SERVICE_PATH:b['explain']='Mismo archivo ObrasService. Incluye los métodos anteriores y los de este caso. Usa directamente los repositorios de TypeORM.'
            if b.get('path')==CONTROLLER_PATH:b['explain']='Mismo ObrasController. Incluye las rutas anteriores y las de este caso.'
            if b.get('path')=='src/taller.module.ts'and phase['id']=='caso-1':b['explain']='Registra ObrasController y ObrasService una sola vez. No se añade otra clase por cada operación.'
    return data


def run():
    p=ROOT/'entrenar/casos/CH-22.json';data=json.loads(p.read_text());apply_training(data);p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    import runpy
    runpy.run_path(str(ROOT/'scripts/generar-preparacion.py'))['generate'](p)
    runpy.run_path(str(ROOT/'scripts/generar-nm.py'))
    print('Arturo: Entities, un Service y un Controller. Otros contextos sin cambios.')


PROF_SERVICE="""import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from './entities/profesional.entity';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional) private readonly profesionales: Repository<Profesional>
  ) {}

  crearProfesional(nombre: string, apellidos: string, email: string) {
    const profesional = this.profesionales.create({ nombre, apellidos, email });
    return this.profesionales.save(profesional);
  }

  listarProfesionales() {
    return this.profesionales.find({ order: { id: 'ASC' } });
  }
}
"""
PROF_CONTROLLER="""import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfesionalesService } from './profesionales.service';

@Controller('profesionales')
export class ProfesionalesController {
  constructor(private readonly service: ProfesionalesService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearProfesional(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarProfesionales();
  }
}
"""
ASIG_SERVICE_HEADER="""import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Obra } from '../obras/entities/obra.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Obra) private readonly obras: Repository<Obra>,
    @InjectRepository(Profesional) private readonly profesionales: Repository<Profesional>
  ) {}
"""
ASIG_METHODS=["""
  async asignarProfesional(obraId: number, profesionalId: number, rol: string) {
    const obra = await this.obras.findOneBy({ id: obraId });
    const profesional = await this.profesionales.findOneBy({ id: profesionalId });
    if (!obra || !profesional) {
      throw new NotFoundException('No existe la obra o el profesional');
    }
    const asignacion = { obraId, profesionalId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El profesional ya está asignado a esa obra');
      }
      throw error;
    }
  }
""", """
  listarPorObra(obraId: number) {
    return this.asignaciones.find({ where: { obraId }, order: { profesionalId: 'ASC' } });
  }
""", """
  listarPorProfesional(profesionalId: number) {
    return this.asignaciones.find({ where: { profesionalId }, order: { obraId: 'ASC' } });
  }
""", """
  async modificarRol(obraId: number, profesionalId: number, rol: string) {
    const resultado = await this.asignaciones.update({ obraId, profesionalId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { obraId, profesionalId, rol };
  }
""", """
  async eliminarAsignacion(obraId: number, profesionalId: number) {
    await this.asignaciones.delete({ obraId, profesionalId });
  }
"""]
ASIG_CONTROLLERS=["""
  @Post('obras/:obraId/asignaciones')
  asignar(@Param('obraId') obraId: string, @Body() datos: { profesionalId: number; rol: string }) {
    return this.service.asignarProfesional(Number(obraId), datos.profesionalId, datos.rol);
  }
""", """
  @Get('obras/:obraId/asignaciones')
  listarPorObra(@Param('obraId') obraId: string) {
    return this.service.listarPorObra(Number(obraId));
  }
""", """
  @Get('profesionales/:profesionalId/asignaciones')
  listarPorProfesional(@Param('profesionalId') profesionalId: string) {
    return this.service.listarPorProfesional(Number(profesionalId));
  }
""", """
  @Patch('obras/:obraId/asignaciones/:profesionalId')
  modificarRol(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string,
    @Body() datos: { rol: string }) {
    return this.service.modificarRol(Number(obraId), Number(profesionalId), datos.rol);
  }
""", """
  @Delete('obras/:obraId/asignaciones/:profesionalId')
  @HttpCode(204)
  eliminar(@Param('obraId') obraId: string, @Param('profesionalId') profesionalId: string) {
    return this.service.eliminarAsignacion(Number(obraId), Number(profesionalId));
  }
"""]

def assignment_service(through):return (ASIG_SERVICE_HEADER+''.join(ASIG_METHODS[:through])+'}').rstrip()
def assignment_controller(through):
    decorators=['Body','Controller','Param','Post']
    if through>=2:decorators.append('Get')
    if through>=4:decorators.append('Patch')
    if through>=5:decorators+=['Delete','HttpCode']
    return ("import { "+', '.join(decorators)+" } from '@nestjs/common';\nimport { AsignacionesService } from './asignaciones.service';\n\n@Controller()\nexport class AsignacionesController {\n  constructor(private readonly service: AsignacionesService) {}\n"+''.join(ASIG_CONTROLLERS[:through])+'}').rstrip()

def apply_nm(data,files):
    if data['caseId']!='CH-22':return
    old=deepcopy(data['tracks']['nest']);data.setdefault('legacyNestIds',[s['id']for s in old]);data['nestSimpleRevision']=2
    # Mantener el modelo, los datos, el arranque y las pruebas; sustituir las capas.
    result=[]
    full_models={s['id']:s for s in old if s['kind']=='model'}
    for item in old:
        if item['chapter']>=3 or item['id']in ['nosql','asignacion','prof-inversa']:continue
        s=deepcopy(full_models['prof-inversa'] if item['id']=='profesional' else item)
        if item['id']=='profesional':s['id']='profesional'
        if s['kind']=='model':
            titles={'profesional':'Crear Profesional Entity completa','obra-inversa':'Ampliar Obra Entity existente','asig-inversas':'Crear Asignacion Entity completa'}
            s['title']=titles[s['id']]
            s['note']='Prepara estos tres archivos completos antes de compilar: Profesional, Obra y Asignacion. Las propiedades enlazan las Entities entre sí; no necesitas crear otra versión del archivo. Ayuntamiento ya está preparado en el 1:N.'
            s['expect']='Este archivo está guardado. Completa las otras Entities y regístralas en el módulo antes de compilar.'
            specs={
              'profesional':[
                ("@Entity({ name: 'PROFESIONAL' })",'Esta clase representa la tabla PROFESIONAL.'),
                ("@PrimaryGeneratedColumn({ name: 'ID' })",'ID es la clave primaria. PostgreSQL genera su valor al guardar un profesional.'),
                ("@Column({ name: 'NOMBRE', type: 'varchar', length: 120 })",'nombre se guarda en NOMBRE como texto de hasta 120 caracteres.'),
                ("@Column({ name: 'APELLIDOS', type: 'varchar', length: 160 })",'apellidos se guarda en otra columna de texto.'),
                ("@Column({ name: 'EMAIL', type: 'varchar', length: 180 })",'email se guarda como texto en EMAIL.'),
                ('@OneToMany(() => Asignacion, asignacion => asignacion.profesional)','Un profesional tiene varias asignaciones. Cada asignación apunta a su profesional.')],
              'obra-inversa':[
                ("@Entity({ name: 'OBRA' })",'Conserva la tabla OBRA y todos sus campos del proyecto 1:N.'),
                ('@ManyToOne(() => Ayuntamiento, ayuntamiento => ayuntamiento.obras, {','La relación anterior se conserva: cada obra pertenece a un ayuntamiento.'),
                ("@JoinColumn({ name: 'ID_AYUNTAMIENTO' })",'ID_AYUNTAMIENTO sigue siendo la clave foránea hacia AYUNTAMIENTO.'),
                ('@OneToMany(() => Asignacion, asignacion => asignacion.obra)','Añade la colección de asignaciones de esta obra. La pareja de IDs se guarda en ASIGNACION.'),
                ('asignaciones!: Asignacion[];','Los corchetes indican una colección. TypeORM puede relacionar la obra con varias asignaciones.')],
              'asig-inversas':[
                ("@Entity({ name: 'ASIGNACION' })",'La tabla intermedia guarda qué profesional participa en qué obra y con qué rol.'),
                ("@PrimaryColumn({ name: 'ID_OBRA', type: 'integer' })",'Primer componente de la clave primaria: el ID de la obra. Este valor llega de la petición; no se genera automáticamente.'),
                ("@PrimaryColumn({ name: 'ID_PROFESIONAL', type: 'integer' })",'Segundo componente. Los dos IDs juntos identifican una única asignación; cada ID por separado puede repetirse.'),
                ("@Column({ name: 'ROL', type: 'varchar', length: 120 })",'ROL pertenece al vínculo: una persona puede tener roles distintos en obras distintas.'),
                ("@ManyToOne(() => Obra, obra => obra.asignaciones, { onDelete: 'RESTRICT' })\n  @JoinColumn({ name: 'ID_OBRA' })",'Cada asignación apunta a una obra mediante ID_OBRA. RESTRICT impide borrar esa obra mientras tenga asignaciones.'),
                ("@ManyToOne(() => Profesional, profesional => profesional.asignaciones, { onDelete: 'RESTRICT' })\n  @JoinColumn({ name: 'ID_PROFESIONAL' })",'La misma fila apunta también al profesional mediante ID_PROFESIONAL. Así se unen ambos extremos.')]
            }
            s['cues']=[]
            for token,note in specs[s['id']]:
                start=s['code'].index(token);s['cues'].append(dict(token=token,start=start,end=start+len(token),note=note))
            if s['id']=='obra-inversa':s['updateExisting']=True;s['create']='code '+s['path']

        if s['id']=='registrar':
            s['code']=module_code(1,True);s['note']='Conserva ObrasController y ObrasService. Añade únicamente las dos nuevas Entities. Los Services y Controllers N:M se registrarán después de crearlos.'
            s['cues']=[dict(token='TypeOrmModule.forFeature([Ayuntamiento, Obra, Profesional, Asignacion])',start=s['code'].index('TypeOrmModule.forFeature'),end=s['code'].index('TypeOrmModule.forFeature')+len('TypeOrmModule.forFeature([Ayuntamiento, Obra, Profesional, Asignacion])'),note='Registra las cuatro Entities. Cada Service recibirá sus repositorios de TypeORM.')]
        result.append(s)
    svc_specs=[
     [('this.profesionales.create({ nombre, apellidos, email })','Prepara el perfil sin guardarlo todavía.'),('this.profesionales.save(profesional)','Guarda la Entity y devuelve su ID generado.'),("this.profesionales.find({ order: { id: 'ASC' } })",'Lista el catálogo usando la misma Entity.')],
     [('async asignarProfesional(obraId: number, profesionalId: number, rol: string)','Los dos IDs y el rol llegan del Controller.'),('this.obras.findOneBy({ id: obraId })','Lee la obra con el repositorio de TypeORM.'),('this.profesionales.findOneBy({ id: profesionalId })','Lee el profesional antes de asociarlo.'),('this.asignaciones.insert(asignacion)','Inserta la pareja; su PK compuesta impide duplicados.')],
     [('listarPorObra(obraId: number)','Recibe un ID de obra.'),("this.asignaciones.find({ where: { obraId }, order: { profesionalId: 'ASC' } })",'Filtra las asignaciones por obra y ordena por profesional.')],
     [('listarPorProfesional(profesionalId: number)','Recibe un ID de profesional.'),("this.asignaciones.find({ where: { profesionalId }, order: { obraId: 'ASC' } })",'Lee los mismos vínculos desde el otro extremo.')],
     [('async modificarRol(obraId: number, profesionalId: number, rol: string)','Recibe la pareja completa y el nuevo rol.'),('this.asignaciones.update({ obraId, profesionalId }, { rol })','Las dos claves seleccionan una asignación. Solo cambia ROL.'),('if (!resultado.affected)','Si no había esa pareja, devuelve 404.')],
     [('async eliminarAsignacion(obraId: number, profesionalId: number)','Ambos IDs identifican el vínculo.'),('this.asignaciones.delete({ obraId, profesionalId })','Borra el vínculo; conserva Obra y Profesional.')]
    ]
    def stage(case,kind,path,code,spec):
        c=[]
        for token,note in spec:
            start=code.index(token);c.append(dict(token=token,start=start,end=start+len(token),note=note))
        resource='Profesionales'if case['chapter']==3 else'Asignaciones'
        method={5:'listarPorObra',6:'listarPorProfesional',7:'modificarRol',8:'eliminarAsignacion'}.get(case['chapter'])
        layer='Service'if kind=='service'else'Controller'
        title=f'Crear {resource}{layer}'if not method else f'Añadir {method} al {layer}'
        note=('Crea este archivo una sola vez. '+('El Service recibe las Entities con InjectRepository y utiliza sus métodos de TypeORM.'if kind=='service'else'El Controller recibe la petición y llama al Service.'))if not method else 'Añade este método al mismo archivo de Asignaciones. Puedes copiar el archivo completo: conserva los métodos anteriores. No crees otra clase ni vuelvas a registrarla.'
        return dict(id=case['slug']+('-service'if kind=='service'else'-entry'),chapter=case['chapter'],title=title,kind=kind,code=code,path=path,note=note,expect=case['expect'],focus='service'if kind=='service'else'entry',cues=c,updateExisting=bool(method),create='code '+path if method else f'mkdir -p {Path(path).parent}\ntouch {path}\ncode {path}')
    for i,case in enumerate(data['cases']):
        item={**case,'chapter':i+3}
        if i==0:
            svc_path='src/profesionales/profesionales.service.ts';ctrl_path='src/profesionales/profesionales.controller.ts';svc=PROF_SERVICE.rstrip();ctrl=PROF_CONTROLLER.rstrip()
            ctrl_specs=[("@Controller('profesionales')",'Agrupa las rutas del catálogo de profesionales.'),('@Post()','POST crea un perfil con nombre, apellidos y correo.'),('this.service.crearProfesional(datos.nombre, datos.apellidos, datos.email)','Entrega los tres valores al Service.'),('@Get()','GET utiliza listarProfesionales en ese mismo Service.')]
        else:
            svc_path='src/asignaciones/asignaciones.service.ts';ctrl_path='src/asignaciones/asignaciones.controller.ts';svc=assignment_service(i);ctrl=assignment_controller(i)
            route=ASIG_CONTROLLERS[i-1].strip().splitlines()[0]
            call=next(line.strip().removeprefix('return ').removesuffix(';')for line in ASIG_CONTROLLERS[i-1].splitlines()if 'return this.service.'in line)
            ctrl_specs=[(route,'Esta ruta identifica el caso y sus parámetros.'),(call,'El Controller convierte los IDs a número y llama al Service.')]
        result += [stage(item,'service',svc_path,svc,svc_specs[i]),stage(item,'entry',ctrl_path,ctrl,ctrl_specs)]
        files[svc_path]=svc+'\n';files[ctrl_path]=ctrl+'\n'
        if i<2:
            prior=next(s for s in old if s['id']==case['slug']+'-registro');mod=deepcopy(prior);mod['code']=module_code(1,True,i+1);mod['title']='Registrar '+('Profesionales'if i==0 else'Asignaciones')+' una sola vez';mod['note']='Registra el Service y el Controller que acabas de crear. Las operaciones siguientes añadirán métodos a estas mismas clases.'
            mod['cues']=[]
            for token,note in [('controllers: [','Nest conecta las rutas de los Controllers.'),('providers: [','Nest puede entregar estos Services por sus constructores.')]:
                start=mod['code'].index(token);mod['cues'].append(dict(token=token,start=start,end=start+len(token),note=note))
            result.append(mod)
        for suffix in ['-ejecutar','-curl']:result.append(deepcopy(next(s for s in old if s['id']==case['slug']+suffix)))
    result += [deepcopy(s)for s in old if s['chapter']==9]
    prior={s['id']:s for s in old}
    data['nestRetainedIds']=[s['id']for s in result if s['id']in prior and s['code']==prior[s['id']]['code'] and s['cues']==prior[s['id']]['cues']]
    snapshot=json.loads((ROOT/'scripts/plantillas/nm-ch22-nest-layout-v1.json').read_text())
    signature=lambda s:hashlib.sha256(json.dumps({'code':s['code'],'cues':s['cues']},ensure_ascii=False,sort_keys=True).encode()).hexdigest()
    data['nestPreviousIds']={'0':data['legacyNestIds'],'1':snapshot['ids']}
    data['nestRetainedByRevision']={'0':data['nestRetainedIds'],'1':[s['id']for s in result if snapshot['hashes'].get(s['id'])==signature(s)]}
    data['nestStepAliases']={'nosql':'logico','asignacion':'asig-inversas','prof-inversa':'profesional'}
    data['tracks']['nest']=result
    # Referencia completa compatible con el 1:N sencillo, sin archivos huérfanos.
    obsolete=['src/obras/crear-listar/','src/obras/eliminar/','src/obras/modificar-presupuesto-euros/','src/obras/trasladar/','src/ayuntamientos/consultar/','src/profesionales/crear-listar/']
    obsolete += ['src/asignaciones/'+c['slug']+'/'for c in data['cases'][1:]]
    data['retiredNestDirectories']=obsolete
    for path in list(files):
        if any(path.startswith(prefix)for prefix in obsolete):del files[path]
    files[SERVICE_PATH]=service_code(5)+'\n';files[CONTROLLER_PATH]=controller_code(5)+'\n';files['src/taller.module.ts']=module_code(1,True,2)+'\n'

if __name__=='__main__':run()
