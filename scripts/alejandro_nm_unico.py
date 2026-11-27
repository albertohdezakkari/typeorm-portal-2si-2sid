"""Piloto CH-31: el módulo N:M reúne las tres Entities y todas sus operaciones."""
from copy import deepcopy
import re

REMOVED={'revisores-modulo','asignar-revisor-registro'}
ALIASES={'revisores-modulo':'asignaciones-modulo','asignar-revisor-registro':'crear-listar-registro'}
SERVICE='src/asignaciones/asignaciones.service.ts'
CONTROLLER='src/asignaciones/asignaciones.controller.ts'
MODULE='src/asignaciones/asignaciones.module.ts'
PROFILE_METHODS='''  crearRevisor(nombre: string, apellidos: string, email: string) {
    const revisor = this.revisores.create({ nombre, apellidos, email });
    return this.revisores.save(revisor);
  }

  listarRevisores() {
    return this.revisores.find({ order: { id: 'ASC' } });
  }'''
PROFILE_ROUTES='''  @Post('revisores')
  crearRevisor(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearRevisor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get('revisores')
  listarRevisores() {
    return this.service.listarRevisores();
  }'''
INITIAL_SERVICE='''import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../documentos/entities/documento.entity';
import { Revisor } from '../revisores/entities/revisor.entity';
import { Asignacion } from './entities/asignacion.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>,
    @InjectRepository(Revisor) private readonly revisores: Repository<Revisor>
  ) {}

'''+PROFILE_METHODS+'\n}'
INITIAL_CONTROLLER='''import { Body, Controller, Get, Post } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';

@Controller()
export class AsignacionesController {
  constructor(private readonly service: AsignacionesService) {}

'''+PROFILE_ROUTES+'\n}'

def service(code):
    if 'class RevisoresService' in code:return INITIAL_SERVICE
    if 'crearRevisor(' in code:return code
    return code.replace('  ) {}','  ) {}\n\n'+PROFILE_METHODS,1)

def controller(code):
    if 'class RevisoresController' in code:return INITIAL_CONTROLLER
    if 'crearRevisor(' in code:return code
    # Todos los métodos comparten Controller sin prefijo y declaran su ruta completa.
    if not re.search(r'\bGet\b',code.splitlines()[0]):code=code.replace('{ Body,','{ Get, Body,',1)
    return code.replace('  constructor(private readonly service: AsignacionesService) {}',
                        '  constructor(private readonly service: AsignacionesService) {}\n\n'+PROFILE_ROUTES,1)

def app(code):
    return '\n'.join(line for line in code.split('\n') if 'RevisoresModule' not in line)

def cues(step):
    refreshed=[]
    for cue in step['cues']:
        token=cue['token'].replace('RevisoresService','AsignacionesService').replace('RevisoresController','AsignacionesController')
        if token in step['code']:
            start=step['code'].index(token)
            refreshed.append({**cue,'token':token,'start':start,'end':start+len(token)})
    step['cues']=refreshed

def apply(data,files):
    if data['caseId']!='CH-31':return
    before=deepcopy(data['tracks']['nest'])
    files.pop('src/revisores/revisores.module.ts',None)
    files.pop('src/revisores/revisores.service.ts',None)
    files.pop('src/revisores/revisores.controller.ts',None)
    files[SERVICE]=service(files[SERVICE]);files[CONTROLLER]=controller(files[CONTROLLER])
    files['src/app.module.ts']=app(files['src/app.module.ts'])
    files['README.md']='''# Alejandro · Documento ↔ Revisor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Documento, Revisor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /revisores y GET /revisores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees RevisoresModule, RevisoresService ni RevisoresController. La Entity
Revisor sigue en src/revisores/entities/revisor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.
'''
    stages=[s for s in data['tracks']['nest']if s['id']not in REMOVED]
    for s in stages:
        path=s.get('path','')
        if path.endswith('.service.ts'):
            s['code']=service(s['code']);s['path']=SERVICE
        if path.endswith('.controller.ts'):
            s['code']=controller(s['code']);s['path']=CONTROLLER
        if path=='src/app.module.ts':s['code']=app(s['code'])
        if s['id']=='crear-listar-registro':s['path']=MODULE;s['code']=files[MODULE]
        if s['id']=='crear-listar-service':
            s.update(title='Crea el Service del caso N:M',create='mkdir -p src/asignaciones\ncode '+SERVICE,
                     note='Un solo Service recibe los tres repositorios: Documento, Revisor y Asignacion. Empieza con crearRevisor y listarRevisores; los siguientes casos amplían este mismo archivo.')
            s['cues']=[c for c in s['cues']if not c['token'].startswith('@InjectRepository(')]
            s['cues']=[{'token':'@InjectRepository('+entity+')','note':meaning}for entity,meaning in [
                ('Asignacion','Repositorio del vínculo: permite guardar y consultar cada pareja de IDs.'),
                ('Documento','Repositorio del primer extremo: permite comprobar que el documento existe.'),
                ('Revisor','Repositorio del segundo extremo: permite crear, listar y comprobar los revisores.')]]+s['cues']
        if s['id']=='crear-listar-entry':
            s.update(title='Crea el Controller del caso N:M',create='code '+CONTROLLER,
                     note='Un solo Controller recibe todas las peticiones N:M. Empieza con POST /revisores y GET /revisores. Las siguientes operaciones se añaden a este mismo archivo.')
            s['cues']=[c for c in s['cues']if c['token']not in ['@Controller()',"@Post('revisores')","@Get('revisores')"]]
            s['cues']=[{'token':token,'note':meaning}for token,meaning in [
                ('@Controller()','Las rutas completas se indican en cada método, porque este Controller atiende Revisores y Asignaciones.'),
                ("@Post('revisores')",'POST /revisores crea un revisor a través del mismo Service N:M.'),
                ("@Get('revisores')",'GET /revisores lista los revisores desde el mismo Service.')]]+s['cues']
        if s['id']=='crear-listar-registro':
            s.update(title='Conecta el Service y el Controller N:M',create='code '+MODULE,
                     note='Actualiza el único AsignacionesModule que preparaste con las tres Entities. Añade AsignacionesService a providers y AsignacionesController a controllers. No añadas otro módulo a AppModule.')
        if s['id'].endswith('-service') and s['chapter']>=4:
            s.update(updateExisting=True,create='code '+SERVICE,
                     note='Amplía el mismo AsignacionesService. El archivo completo conserva crearRevisor, listarRevisores y los métodos anteriores. Los tres repositorios ya están inyectados; no registres otro Service.')
            if s['chapter']==4:s['title']='Añade asignarRevisor al mismo Service'
        if s['id'].endswith('-entry') and s['chapter']>=4:
            s.update(updateExisting=True,create='code '+CONTROLLER,
                     note='Amplía el mismo AsignacionesController. El archivo completo conserva las rutas de Revisores y las operaciones anteriores. El módulo ya lo tiene registrado.')
            if s['chapter']==4:s['title']='Añade la asignación al mismo Controller'
        if s['id']=='asignaciones-modulo':
            s['title']='Prepara un único módulo para la N:M'
            s['note']='Este módulo agrupa Documento, Revisor y Asignacion y prepara sus tres repositorios. Cuando crees el Service y el Controller, completarás este mismo archivo. No se crea un módulo por Entity.'
        if s['id']=='registrar':
            s['title']='Conecta el módulo N:M una sola vez'
            s['note']='Conserva ArchivosModule, DocumentosModule y la conexión 1:N. Añade solo AsignacionesModule para el caso N:M completo. Si seguiste la versión anterior, retira RevisoresModule de AppModule y sus archivos module, service y controller; conserva revisor.entity.ts.'
            s['expect']='AppModule conserva el 1:N e importa AsignacionesModule una sola vez. Este módulo reúne las tres Entities de la N:M.'
        if s['id']=='revisor':s['note']=s['note'].replace('configura sus módulos','configura el único módulo N:M')
        if s['id']=='documento-inversa':s['title']='Relaciona el Documento existente con Asignacion'
        if s['id']=='arrancar':s['note']=s['note'].replace('los dos módulos','AsignacionesModule')
        for key in ['expect','note']:
            s[key]=s.get(key,'').replace('esa documento','ese documento').replace('la misma documento','el mismo documento').replace('otra documento','otro documento').replace('en las que participa','en los que participa')
        for cue in s['cues']:cue['note']=cue['note'].replace('de este recurso','del caso N:M')
        cues(s)
    data['tracks']['nest']=stages
    data.setdefault('nestStepAliases',{}).update(ALIASES)
    if not data.get('nmModuleRevision'):
        data['nmModuleMigration']={'previousIds':[s['id']for s in before], 'aliases':ALIASES,
            'retained':[s['id']for s in before if any(s['id']==x['id']and s['code']==x['code']and s['cues']==x['cues']for x in stages)]}
    data['nmModuleRevision']=1

def runtime(code):
    code=code.replace('function defaults(saved){','function defaults(saved){\n const modulePositionIsOld=saved?.nestSimpleRevision===D.nestSimpleRevision&&saved?.apiRevision===D.apiRevision;')
    marker=' const s={apiRevision:'
    migration=''' if(D.nmModuleRevision&&saved&&saved.nmModuleRevision!==D.nmModuleRevision){
  saved=structuredClone(saved);
  if(modulePositionIsOld){
   const id=D.nmModuleMigration.previousIds[saved.positions?.nest],target=D.nmModuleMigration.aliases[id]||id;
   if(saved.positions)saved.positions.nest=Math.max(0,D.tracks.nest.findIndex(x=>x.id===target));
  }
  const keep=k=>!String(k).startsWith('nest:')||D.nmModuleMigration.retained.includes(String(k).slice(5));
  saved.answers=Object.fromEntries(Object.entries(saved.answers||{}).filter(([k])=>keep(k)));
  saved.solved=(saved.solved||[]).filter(keep);saved.checked=(saved.checked||[]).filter(keep);
  if(saved.track==='nest'){saved.cue=0;saved.mode='observe';saved.full=true;}
 }
'''
    code=code.replace(marker,migration+marker).replace(' const s={apiRevision:',' const s={nmModuleRevision:D.nmModuleRevision??0,apiRevision:')
    code=code.replace("?'crear-listar-repository':id;", "?'crear-listar-repository':((t==='nest'?D.nmModuleMigration?.aliases[id]:null)||id);")
    code=code.replace("'RevisoresModule + AsignacionesModule','Añade los dos recursos N:M'", "'AsignacionesModule','Un único módulo reúne Documento, Revisor y Asignacion'")
    code=code.replace("'UN MÓDULO POR RECURSO'", "'UN MÓDULO PARA TODA LA N:M'")
    code=code.replace('CH-31.json?v=altas-api-1','CH-31.json?v=nm-unico-alejandro-1')
    return code
