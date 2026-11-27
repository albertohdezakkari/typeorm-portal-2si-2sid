"""Piloto CH-22. La base docente real, módulos pequeños y continuidad 1:N → N:M.

Se ejecuta después de nest_sencillo/orm_sin_sql; solo transforma Nest de Arturo.
La configuración procede de examen-typeorm-27-11-26-01, revisión 87d1475.
"""
from copy import deepcopy
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
BASE_URL = 'https://github.com/albertohdezakkari/examen-typeorm-27-11-26-01'
BASE = dict(url=BASE_URL, revision='87d14758960120570436906207b09073bb3731c3', backend='backend', pilot=True)
OBRAS_MODULE = 'src/obras/obras.module.ts'


def module_code(resource='Obras', active=False, nm=False):
    entities = {'Obras': [('Ayuntamiento', '../ayuntamientos/entities/ayuntamiento.entity'), ('Obra', './entities/obra.entity')],
                'Profesionales': [('Profesional', './entities/profesional.entity')],
                'Asignaciones': [('Asignacion', './entities/asignacion.entity'), ('Obra', '../obras/entities/obra.entity'), ('Profesional', '../profesionales/entities/profesional.entity')]}[resource]
    route = resource.lower()
    lines = ["import { Module } from '@nestjs/common';", "import { TypeOrmModule } from '@nestjs/typeorm';"]
    lines += [f"import {{ {name} }} from '{path}';" for name, path in entities]
    if active:
        lines += [f"import {{ {resource}Service }} from './{route}.service';", f"import {{ {resource}Controller }} from './{route}.controller';"]
    return '\n'.join(lines) + "\n\n@Module({\n  imports: [TypeOrmModule.forFeature([" + ', '.join(name for name, _ in entities) + "])],\n  providers: [" + (resource+'Service' if active else '') + "],\n  controllers: [" + (resource+'Controller' if active else '') + "]\n})\nexport class " + resource + 'Module {}'


def app_code(models=False, nm=False):
    imports = ("import { ObrasModule } from './obras/obras.module';\n" if models else '')
    modules = ['ObrasModule'] if models else []
    if nm:
        imports += "import { ProfesionalesModule } from './profesionales/profesionales.module';\nimport { AsignacionesModule } from './asignaciones/asignaciones.module';\n"
        modules += ['ProfesionalesModule', 'AsignacionesModule']
    return '''import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'node:path';
import { SaludController } from './salud.controller';
''' + imports + '''
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [resolve(__dirname, '../.env'), resolve(__dirname, '../.env.example')]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.getOrThrow<string>('DB_PORT')),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true
      })
    })''' + ''.join(',\n    '+name for name in modules) + '''
  ],
  controllers: [SaludController]
})
export class AppModule {}'''

HEALTH = '''import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('salud')
export class SaludController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  comprobarConexion() {
    return {
      estado: this.dataSource.isInitialized ? 'ok' : 'sin conexión',
      base: this.dataSource.options.database
    };
  }
}'''


def file(path, code, explain=''):
    return dict(kind='file', title=path, path=path, code=code, create=f'mkdir -p {Path(path).parent}\ncode {path}', explain=explain, terms=[])


def command(title, code, explain=''):
    return dict(kind='command', title=title, code=code, explain=explain, terms=[])


def instruction(title, instructions, explain=''):
    return dict(kind='instruction', title=title, code='', instructions=instructions, explain=explain, terms=[])


def replace(value, before, after):
    if isinstance(value, str): return value.replace(before, after)
    if isinstance(value, list): return [replace(x,before,after) for x in value]
    if isinstance(value, dict): return {k:replace(v,before,after) for k,v in value.items()}
    return value


def training(d):
    if d['context']['id'] != 'CH-22': return d
    for stage in d['steps']['nest']:
        if stage['scene']=='result':stage['code']=stage['code'].replace('Para ejecutar sobre tu base, abre Preparar y ejecutar y utiliza los IDs reales de ids-aula.env.', 'Los comandos para tu base están en «Prueba este caso desde tu terminal», al pie de este mismo paso. Utiliza los IDs reales de ids-aula.env.')
    if d.get('projectBase') == BASE: return d
    d['projectBase'] = deepcopy(BASE)
    d['legacyNestChapters'] = [s['chapter'] for s in d['steps']['nest']]
    d['nestSimpleRevision'] = 3
    for s in d['steps']['nest']:
        if s['scene'] == 'nest-module':
            active = s['chapter'] > 0
            s['path'] = OBRAS_MODULE
            s['code'] = module_code(active=active)
            s['cues'] = [dict(text='TypeOrmModule.forFeature([Ayuntamiento, Obra])', title='Registra las Entities de este módulo', note='Nest prepara Repository<Ayuntamiento> y Repository<Obra> para el Service.')]
            if active:
                s['cues'] += [dict(text='providers: [ObrasService]', title='Registra el Service', note='Es el mismo Service al que añades los métodos de cada caso.'), dict(text='controllers: [ObrasController]', title='Registra el Controller', note='Es el mismo Controller que recibe las peticiones HTTP de este recurso.')]
        # Misma lectura de relación que la base docente; cada campo se ve en su contexto.
        if s['name'] == 'Service' and s['chapter'] >= 1:
            old="this.obras.find({ order: { id: 'ASC' } })"
            new="this.obras.find({ relations: { ayuntamiento: true }, order: { id: 'ASC' } })"
            s['code']=s['code'].replace(old,new)
            for cue in s['cues']:
                if cue['text']==old:
                    cue.update(text=new, note='find devuelve las obras; relations carga el ayuntamiento asociado y order las ordena por ID.')
    d['source'] = dict(kind='pilot', label='Arturo · base docente Nest + TypeORM', url=BASE_URL)
    return d


def preparation(d, train):
    if d['caseId'] != 'CH-22': return
    d['projectBase'] = deepcopy(BASE)
    d['nestSimpleRevision'] = 3
    # Renueva únicamente la preparación Nest que cambia de base.
    d['ormDataRevision'] = 2
    d['ormDataRevisedSteps'] = [s['id'] for s in d['tracks']['nest']]
    stages={s['id']:s for s in d['tracks']['nest']}
    s=stages['repositorio']
    s.update(title='Clona tu proyecto base', lead='Parte del repositorio preparado por el profesor. Trabajarás en backend; frontend se conserva para más adelante.', where='Git Bash (Windows) o Terminal (macOS) · primera vez', nodes=['Tu ordenador','Tu GitHub','backend/','src/'])
    s['blocks']=[command('1 · Crea tu carpeta y clona', 'mkdir -p "$HOME/proyectos"\ncd "$HOME/proyectos"\ngit clone --branch main --single-branch '+BASE_URL+'.git taller-arturo\ncd taller-arturo\ncode .', '$HOME es tu carpeta personal en Git Bash y macOS. git clone crea taller-arturo; si ya tienes esta copia, ábrela en VS Code y continúa, sin volver a clonar.'),
        instruction('2 · Prepara un repositorio en tu cuenta', ['Abre github.com/new e inicia sesión con tu cuenta.', 'Crea un repositorio vacío, sin README, .gitignore ni licencia.', 'Copia su URL HTTPS. Ejecuta el bloque siguiente en la raíz de la copia recién clonada.']),
        command('3 · Vincula tu propia copia', 'printf \'Pega la URL HTTPS de tu repositorio vacío: \'\nIFS= read -r MI_REPOSITORIO\ngit remote set-url origin "$MI_REPOSITORIO"\ngit remote -v\ngit push -u origin main', 'origin pasa a ser tu repositorio: los próximos commits y push irán a tu cuenta. No estás modificando el repositorio del profesor.')]
    s['expect']='VS Code muestra backend y frontend. git remote -v muestra tu GitHub. Todo el recorrido Nest se hace dentro de backend.'
    s=stages['base'];s.update(title='Prepara backend y .env', lead='Las dependencias, main.ts y la configuración TypeORM ya vienen preparados en tu base. No copies otra plantilla.', where='Terminal 1 de VS Code · raíz del repositorio', nodes=['backend/','package.json','.env','AppModule'])
    s['blocks']=[command('1 · Entra en backend e instala', 'cd backend\npwd\nnode --version\nnpm ci --legacy-peer-deps\ncode .env', 'Necesitas Node 20.19.4 o superior. npm ci instala las versiones del lockfile; --legacy-peer-deps es la opción comprobada para instalar esta base con npm 10. Si ya estás en backend, no repitas cd backend. Guarda el archivo .env desde VS Code.'),
        file('.env','DB_PASSWORD=ESCRIBE_TU_CONTRASEÑA','Sustituye ESCRIBE_TU_CONTRASEÑA por la contraseña real de PostgreSQL y guarda. Los demás valores ya se leen de .env.example: localhost, 5432, postgres, base postgres y puerto 3000. Si tu instalación utiliza otros valores, añádelos a .env. Este archivo está excluido de Git.'),
        instruction('2 · Reconoce lo que ya trae la base',['src/main.ts arranca Nest y habilita CORS.', 'src/app.module.ts carga .env y .env.example y configura TypeORM.', 'La muestra Cine/Proyección se sustituirá por Ayuntamiento/Obra en tu copia.', 'Antes de ejecutar el backend, continúa los pasos 3 y 4. No vuelvas a configurar una segunda aplicación.'])]
    s['expect']='Estás en backend, las dependencias están instaladas y .env contiene tu contraseña real. Todavía no has arrancado Nest.'
    s=stages['postgres'];s.update(title='Enciende PostgreSQL', lead='Comprueba el servidor que utiliza esta base. No crees tablas a mano.', where='Servicios (Windows) o tu aplicación PostgreSQL (macOS)',nodes=['PostgreSQL','localhost:5432','.env / .env.example','base postgres'])
    s['blocks']=[instruction('PostgreSQL debe estar disponible', ['Si PostgreSQL no está instalado, instala PostgreSQL con pgAdmin y conserva la contraseña del usuario postgres.', 'En Windows: Win+R → services.msc → localiza PostgreSQL → Iniciar. En macOS: abre la aplicación o servicio con el que instalaste PostgreSQL y arráncalo.', 'Abre pgAdmin y conecta con esos mismos host, puerto, usuario y contraseña.', 'La base predeterminada postgres ya existe. El proyecto la utiliza mediante .env.example; no necesitas crear AYUNTAMIENTO ni OBRA.', 'Si ya utilizabas una base propia, conserva su DB_NAME y la conexión en .env. Las Entities crearán las tablas al arrancar Nest.'])]
    s['expect']='pgAdmin conecta con la base configurada. Las tablas se crearán desde las Entities, mediante synchronize: true.'
    s=stages['conexion'];s.update(title='Conserva la conexión de la base', lead='La conexión ya está hecha. Solo retiramos la muestra Cine/Proyección y dejamos /salud como comprobación sencilla.',where='backend · antes del primer arranque',nodes=['.env / .env.example','ConfigModule','TypeOrmModule','GET /salud'])
    s['blocks']=[command('Excluye los IDs de tu base del repositorio', "printf '\\nids-aula.env\\n' >> .gitignore", 'Cada base genera sus propios IDs. ids-aula.env no se sube a GitHub.'),file('src/app.module.ts',app_code(), 'Es la configuración de tu proyecto base. Se conserva ConfigModule, forRootAsync, autoLoadEntities y synchronize: true. Solo retiramos ProyeccionModule; ObrasModule se conectará en el siguiente paso.'),file('src/salud.controller.ts',HEALTH,'DataSource.isInitialized informa de que TypeORM ha abierto la conexión. No hay SQL escrito a mano.'), instruction('Retira únicamente la muestra de esta copia',['En el explorador de VS Code, elimina backend/src/cine y backend/src/proyeccion: son las dos carpetas de ejemplo Cine/Proyección recién clonadas.', 'Conserva app.module.ts, main.ts y salud.controller.ts.', 'No elimines carpetas de un trabajo anterior: si ya estás en tu backend de Ayuntamiento/Obra, conserva tus archivos y compara el código de estos pasos.']),command('Terminal 1 · compila y arranca', 'npm run build\nnpm run start:dev','Cuando build termine sin errores, ejecuta start:dev. Deja esta terminal abierta: Nest sigue atendiendo peticiones y recompila al guardar.'),command('Terminal 2 · prueba la conexión','curl -i http://localhost:3000/salud','Abre Terminal → Nueva terminal, sin cerrar la Terminal 1. Debes ver HTTP 200, estado ok y el nombre real de tu base.')]
    s['expect']='Nest arranca con la configuración original de la base y /salud devuelve HTTP 200. No quedan clases Cine/Proyección en tu copia de Arturo.'
    s=stages['modelos'];s.update(title='Crea las Entities y ObrasModule',lead='Prepara Ayuntamiento y Obra. Después regístralas en el módulo e importa ese módulo en AppModule.',where='backend · Terminal 1 detenida con Ctrl+C',nodes=['AppModule','ObrasModule','Ayuntamiento 1','Obra 0..N'])
    s['blocks']=[b for b in s['blocks']if b.get('path') in ['src/ayuntamientos/entities/ayuntamiento.entity.ts','src/obras/entities/obra.entity.ts']]+[file(OBRAS_MODULE,module_code(), 'Este módulo solo registra las Entities. Aún no importa un Service ni un Controller que no hayas creado.'), file('src/app.module.ts',app_code(models=True),'Conserva la conexión de la base y añade ObrasModule al array imports. forRootAsync abre PostgreSQL; forFeature prepara los repositorios de estas Entities.'),command('Terminal 1 · compila y arranca','npm run build\nnpm run start:dev','Guarda los cuatro archivos antes de compilar. Deja esta terminal abierta. A partir de ahora start:dev recompila tus cambios.'),command('Terminal 2 · comprueba TypeORM','curl -i http://localhost:3000/salud','En pgAdmin actualiza Schemas → public → Tables: verás AYUNTAMIENTO y OBRA, creadas por TypeORM con la FK ID_AYUNTAMIENTO.')]
    s['expect']='TypeORM ha creado AYUNTAMIENTO y OBRA desde las Entities. AppModule importa ObrasModule. El módulo conecta las Entities con el Repository nativo de TypeORM.'
    for phase in d['tracks']['nest']:
        phase['where']='backend · tu proyecto Nest' if phase['id'] in ['datos','guardar'] or phase['id'].startswith('caso-') else phase['where']
        if phase['id'].startswith('caso-'):
            ch=int(phase['id'][5:])
            for b in phase['blocks']:
                if b.get('path')=='src/taller.module.ts' or b.get('path')==OBRAS_MODULE:b.update(file(OBRAS_MODULE,module_code(active=True),'Un módulo pequeño: Entities, Service y Controller de Obras. Los siguientes casos añaden métodos a los mismos archivos.'))
                elif b.get('path') in ['src/obras/obras.service.ts','src/obras/obras.controller.ts']:
                    b['code']=next(x['code']for x in train['steps']['nest']if x['chapter']==ch and x['path']==b['path'])
                elif 'reinicia' in b.get('title','').lower():
                    b.update(instruction('Guarda y espera la recompilación',['Guarda todos los archivos indicados en este caso.', 'En Terminal 1, start:dev recompila automáticamente. Espera «Found 0 errors» y el arranque de Nest.', 'Si lo habías detenido, ejecuta npm run start:dev desde backend.', 'Prueba los curl en Terminal 2. No pegues un curl en la terminal ocupada por Nest.']))
        for b in phase['blocks']:
            if 'code'in b:b['code']=b['code'].replace('node --env-file=.env ', 'node ')
            if b.get('path') in ['src/datos/cargar-datos.ts','src/datos/cargar-datos-nm.ts']:
                b['explain'] = b['explain'].split(' AppModule carga .env y .env.example igual que el backend.')[0] + ' AppModule carga .env y .env.example igual que el backend. Ejecuta el script con node después de compilar; no modifica tu configuración.'
        if phase['id']=='guardar':
            phase['blocks'][-1]=command('Retoma mañana','git pull\ncd backend\nnpm run start:dev','Abre VS Code en la raíz de tu repositorio, arranca PostgreSQL y ejecuta estas líneas. Si ya estás dentro de backend, no repitas cd backend. No vuelvas a instalar o configurar lo que ya tienes.')


def set_cues(s,specs):
    s['cues']=[]
    for token,note in specs:
        start=s['code'].index(token);s['cues'].append(dict(token=token,start=start,end=start+len(token),note=note))


def nm(d, files):
    if d['caseId'] != 'CH-22': return
    if d.get('projectBase')==BASE:return
    old=[s['id'] for s in d['tracks']['nest']]
    d.setdefault('nestPreviousIds',{})['2']=old
    d.setdefault('nestRetainedByRevision',{})['2']=[s['id']for s in d['tracks']['nest']if s['kind']not in ['module'] and s['id']not in ['retomar','arrancar','cargar']]
    d['nestSimpleRevision']=3;d['projectBase']=deepcopy(BASE)
    result=[]
    for s in d['tracks']['nest']:
        if s['id']=='registrar':
            for resource in ['Profesionales','Asignaciones']:
                path=f'src/{resource.lower()}/{resource.lower()}.module.ts'
                stage=dict(id=resource.lower()+'-modulo',chapter=1,title='Prepara '+resource+'Module',kind='module',path=path,code=module_code(resource),note='Registra las Entities necesarias. El Service y el Controller se conectarán cuando los crees en su caso de uso.',expect='El módulo existe y no importa clases que aún no has creado.',focus='model',create=f'mkdir -p {Path(path).parent}\ncode {path}')
                line=next(x.strip().rstrip(',')for x in stage['code'].splitlines()if'forFeature'in x)
                set_cues(stage,[(line,'forFeature prepara los repositorios de estas Entities para este módulo.')]);result.append(stage)
            s.update(title='Conecta los dos nuevos módulos',path='src/app.module.ts',code=app_code(models=True,nm=True),create='code src/app.module.ts',note='Mantén ObrasModule y la conexión original. Añade ProfesionalesModule y AsignacionesModule: cada recurso tendrá su módulo, Service y Controller.',expect='AppModule conserva Obras y añade Profesionales y Asignaciones; synchronize: true crea las nuevas tablas.')
            set_cues(s,[('ProfesionalesModule,','Carga el módulo que registra Profesional.'),('AsignacionesModule\n','Carga el módulo que registra Asignacion y los dos extremos.')])
        if s['id'] in ['crear-listar-registro','asignar-profesional-registro']:
            resource='Profesionales'if s['id']=='crear-listar-registro'else'Asignaciones'
            s.update(path=f'src/{resource.lower()}/{resource.lower()}.module.ts',code=module_code(resource,active=True),create=f'code src/{resource.lower()}/{resource.lower()}.module.ts',note='Es el módulo que ya creaste. Añade su Service a providers y su Controller a controllers. No modifiques la conexión ni ObrasModule.')
            set_cues(s,[(f'providers: [{resource}Service]','Registra el único Service de este recurso.'),(f'controllers: [{resource}Controller]','Registra el único Controller de este recurso.')])
        if s['id']=='retomar':
            s['note']='Continúa en la carpeta backend de tu proyecto Ayuntamiento/Obra ya preparado en 1:N. No clones ni instales otra base. Conserva .env, dependencias, tablas, datos y tus casos anteriores. Si Nest ya está ejecutándose, pasa directamente al bloque 2.'
            s['runbook'][0].update(code='npm run start:dev',instruction='Enciende PostgreSQL como hacías en 1:N. Abre Terminal 1 dentro de backend y ejecuta npm run start:dev. No reinstales dependencias ni vuelvas a configurar .env.',expect='Ves «Nest application successfully started». Deja Terminal 1 abierta; start:dev recompila al guardar.')
        if s['id']=='arrancar':
            s['code']='npm run build\nnpm run start:dev';s['note']='Guarda primero las nuevas Entities, los dos módulos y AppModule. Detén el proceso anterior con Ctrl+C antes de ejecutar estas líneas en Terminal 1. La conexión y las tablas 1:N se conservan.'
            set_cues(s,[('npm run build','Compila todos los archivos guardados y detecta imports pendientes.'),('npm run start:dev','Arranca Nest y mantiene la recompilación automática.')])
        if s['id'].endswith('-ejecutar'):
            s['code']='npm run build\nnpm run start:dev';s['note']='Guarda los archivos del caso. Si start:dev ya está abierto, espera su recompilación y pasa al curl; no abras otro servidor. Si está detenido, ejecuta estas líneas en Terminal 1.'
            set_cues(s,[('npm run build','Comprueba que los archivos del caso compilan.'),('npm run start:dev','Mantiene el servidor escuchando mientras pruebas desde Terminal 2.')])
        if 'code'in s:
            before=s['code'];s['code']=s['code'].replace('node --env-file=.env ','node ')
            if s['code']!=before:
                specs=[(cue['token'].replace('node --env-file=.env ','node '),cue['note'])for cue in s['cues']];set_cues(s,specs)
        result.append(s)
    d['tracks']['nest']=result
    # Conserva la configuración exacta de la referencia auditada al regenerar.
    for name in ['package.json','package-lock.json','nest-cli.json','tsconfig.json','tsconfig.build.json','.env.example','.gitignore','src/main.ts','README.md']:
        source=ROOT/'nm/codigo/nest'/name
        if source.exists(): files[name]=source.read_text()
    files.pop('src/taller.module.ts',None)
    files[OBRAS_MODULE]=module_code(active=True)+'\n'
    files['src/app.module.ts']=app_code(models=True,nm=True)+'\n'
    files['src/salud.controller.ts']=HEALTH+'\n'
    for resource in ['Profesionales','Asignaciones']:files[f'src/{resource.lower()}/{resource.lower()}.module.ts']=module_code(resource,active=True)+'\n'


def main():
    train_path=ROOT/'entrenar/casos/CH-22.json';train=json.loads(train_path.read_text());training(train);train_path.write_text(json.dumps(train,ensure_ascii=False,indent=2)+'\n')
    prep_path=ROOT/'preparar/CH-22.json';prep=json.loads(prep_path.read_text());preparation(prep,train);prep_path.write_text(json.dumps(prep,ensure_ascii=False,indent=2)+'\n')
    nm_path=ROOT/'nm/CH-22.json';data=json.loads(nm_path.read_text());dest=ROOT/'nm/codigo/nest';files={str(p.relative_to(dest)):p.read_text()for p in dest.rglob('*')if p.is_file()};nm(data,files)
    # La referencia N:M usa el mismo Service final de 1:N.
    files['src/obras/obras.service.ts']=next(s['code']for s in train['steps']['nest']if s['chapter']==5 and s['name']=='Service')+'\n'
    stale=dest/'src/taller.module.ts'
    if stale.exists():stale.unlink()
    for path,code in files.items():
        out=dest/path;out.parent.mkdir(parents=True,exist_ok=True);out.write_text(code)
    nm_path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    for track in train['steps'].values():
        for stage in track:
            for cue in stage['cues']:assert cue['text']in stage['code'],(stage['path'],cue)
    for stage in data['tracks']['nest']:
        for cue in stage['cues']:assert stage['code'][cue['start']:cue['end']]==cue['token'],stage['id']
    print('Arturo: base docente integrada; otros contextos y Serverless intactos.')

if __name__=='__main__':main()
