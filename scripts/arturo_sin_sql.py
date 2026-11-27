"""Piloto CH-22: carga y comprobación desde Entities, sin SQL manual.

No transforma los otros contextos. Los números de las fichas son ejemplos;
las peticiones reales utilizan los IDs generados, también en una base nueva.
"""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
LOAD_PATH='src/datos/cargar-datos.ts'
NM_LOAD_PATH='src/datos/cargar-datos-nm.ts'
LOAD='''import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from '../obras/entities/obra.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const ayuntamientos = db.getRepository(Ayuntamiento);
    const obras = db.getRepository(Obra);

    const primero = await ayuntamientos.findOneBy({ nombre: 'Ayuntamiento del Río' })
      ?? await ayuntamientos.save({ nombre: 'Ayuntamiento del Río' });
    const segundo = await ayuntamientos.findOneBy({ nombre: 'Ayuntamiento del Valle' })
      ?? await ayuntamientos.save({ nombre: 'Ayuntamiento del Valle' });

    const principal = await obras.findOneBy({ nombre: 'Mejora de acera' })
      ?? await obras.save({ nombre: 'Mejora de acera', presupuestoEuros: 3000, ayuntamiento: primero });
    const secundaria = await obras.findOneBy({ nombre: 'Zona de sombra' })
      ?? await obras.save({ nombre: 'Zona de sombra', presupuestoEuros: 12000, ayuntamiento: segundo });
    const otra = await obras.findOneBy({ nombre: 'Mejora de acera · nuevo' })
      ?? await obras.save({ nombre: 'Mejora de acera · nuevo', presupuestoEuros: 18000, ayuntamiento: primero });

    writeFileSync('ids-aula.env', [
      `export AYUNTAMIENTO_1_ID=${primero.id}`,
      `export AYUNTAMIENTO_2_ID=${segundo.id}`,
      `export OBRA_1_ID=${principal.id}`,
      `export OBRA_2_ID=${secundaria.id}`,
      `export OBRA_3_ID=${otra.id}`
    ].join('\\n') + '\\n');
    console.table(await obras.find({ relations: { ayuntamiento: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });'''
NM_LOAD='''import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from '../obras/entities/obra.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const obras = db.getRepository(Obra);
    const ayuntamientos = db.getRepository(Ayuntamiento);
    const profesionales = db.getRepository(Profesional);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await obras.findOneByOrFail({ nombre: 'Mejora de acera' });
    const secundaria = await obras.findOneByOrFail({ nombre: 'Zona de sombra' });
    const otra = await obras.findOneByOrFail({ nombre: 'Mejora de acera · nuevo' });
    const primero = await ayuntamientos.findOneByOrFail({ nombre: 'Ayuntamiento del Río' });
    const segundo = await ayuntamientos.findOneByOrFail({ nombre: 'Ayuntamiento del Valle' });

    const diego = await profesionales.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await profesionales.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await profesionales.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await profesionales.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { obraId: principal.id, profesionalId: diego.id, rol: 'Electricista' },
      { obraId: principal.id, profesionalId: ana.id, rol: 'Arquitecta' },
      { obraId: secundaria.id, profesionalId: diego.id, rol: 'Coordinador' }
    ]) {
      const existente = await asignaciones.findOneBy({ obraId: datos.obraId, profesionalId: datos.profesionalId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export AYUNTAMIENTO_1_ID=${primero.id}`,
      `export AYUNTAMIENTO_2_ID=${segundo.id}`,
      `export OBRA_1_ID=${principal.id}`,
      `export OBRA_2_ID=${secundaria.id}`,
      `export OBRA_3_ID=${otra.id}`,
      `export PROFESIONAL_1_ID=${diego.id}`,
      `export PROFESIONAL_2_ID=${ana.id}`
    ].join('\\n') + '\\n');
    console.table(await asignaciones.find({ order: { obraId: 'ASC', profesionalId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });'''

def file(path,code,explain):
    return dict(kind='file',title=path,path=path,code=code,create=f'mkdir -p {Path(path).parent}\ntouch {path}\ncode {path}',explain=explain,terms=[])
def command(title,code,explain=''):
    return dict(kind='command',title=title,code=code,explain=explain,terms=[])
def clean_health(code):
    return code.replace("  async salud() {\n    const [resultado] = await this.db.query('SELECT current_database() AS base');\n    return { estado: 'ok', base: resultado.base };", "  salud() {\n    return { estado: this.db.isInitialized ? 'ok' : 'sin conexión', base: process.env.DB_NAME };")

LOAD_NOTE='Este archivo usa las Entities: findOneBy busca un ejemplo existente y save lo crea si falta. Los IDs los genera PostgreSQL mediante PrimaryGeneratedColumn. Repetir la carga conserva los datos ya existentes.'
IDS_NOTE='Ejecuta en Terminal 2. El punto seguido de espacio carga las variables de ids-aula.env en esta terminal. OBRA_1_ID es el ID real de «Mejora de acera»; OBRA_2_ID, el de «Zona de sombra». Los números 7, 8 y 9 de los dibujos son ejemplos para explicar la traza; no se fuerzan en tu base.'

NEST_TESTS={
 3:'curl -i -X PATCH "http://localhost:3000/obras/$OBRA_1_ID" \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{"presupuestoEuros":15000}\'\ncurl -i http://localhost:3000/obras',
 4:'curl -i -X PATCH "http://localhost:3000/obras/$OBRA_1_ID/ayuntamiento" \\\n  -H \'Content-Type: application/json\' \\\n  -d "{\\"ayuntamientoId\\":$AYUNTAMIENTO_2_ID}"\ncurl -i http://localhost:3000/obras',
 5:'curl -i "http://localhost:3000/ayuntamientos/$AYUNTAMIENTO_2_ID/obras?minimo=12001"'
}

def preparation(data,training):
    if data['caseId']!='CH-22':return
    data['ormDataRevision']=1
    data['ormDataRevisedSteps']=['postgres','conexion','modelos','datos','caso-1','caso-2','caso-3','caso-4','caso-5','guardar']
    for phase in data['tracks']['nest']:
        id=phase['id']
        if id=='postgres':
            phase.update(lead='PostgreSQL debe estar encendido. La base vacía se prepara una sola vez desde pgAdmin; las tablas las generará TypeORM con tus Entities.',where='pgAdmin · servidor PostgreSQL local',blocks=[dict(kind='instruction',title='Crea la base vacía desde pgAdmin',code='',instructions=['Abre pgAdmin y conecta con tu servidor PostgreSQL.','En el panel izquierdo, pulsa con el botón derecho sobre Databases → Create → Database.','Escribe control_databridge y pulsa Save. Si ya existe, utiliza esa base sin borrarla.','Conserva host, puerto, usuario y contraseña de tu .env. En el siguiente paso Nest comprobará la conexión.'],explain='Aquí solo preparas la base vacía. TypeORM creará sus tablas y relaciones al arrancar con las Entities registradas y synchronize: true.',terms=[])],expect='La base control_databridge aparece en pgAdmin. Aún no necesitas crear tablas ni escribir consultas.')
        if id=='conexion':
            phase['nodes']=['.env','TypeOrmModule.forRoot','DataSource.isInitialized','GET /salud']
            phase['lead']='TypeOrmModule abre la conexión con tu .env. /salud comprueba que DataSource está inicializado.'
            phase['expect']='GET /salud devuelve HTTP 200, estado ok y el nombre de tu base. La conexión de TypeORM se ha inicializado.'
        for b in phase['blocks']:
            if b.get('path')=='src/app.module.ts':
                b['code']=clean_health(b['code'])
                b['terms']=[[token,meaning]for token,meaning in b.get('terms',[])if 'SELECT'not in token]
                b['terms'].append(['this.db.isInitialized','Indica que TypeORM ha inicializado la conexión. No ejecuta una consulta escrita a mano.'])
        if id=='modelos':
            phase['blocks']=[b for b in phase['blocks']if 'psql 'not in b.get('code','')]
            phase['blocks'].append(command('Terminal 2 · comprueba TypeORM','curl -i http://localhost:3000/salud','Con synchronize: true, al arrancar Nest TypeORM crea las tablas y las relaciones declaradas en las Entities. Puedes verlas en pgAdmin → Schemas → public → Tables.'))
        if id=='datos':
            phase['nodes']=['Ayuntamiento del Río','Mejora de acera y otra obra','Ayuntamiento del Valle','Zona de sombra']
            phase.update(lead='Carga los mismos ejemplos con save() y consulta con find(). Si ya existen, se conservan. No escribes consultas manuales.',blocks=[file(LOAD_PATH,LOAD,LOAD_NOTE),command('Compila y carga los ejemplos','npm run build\nnode --env-file=.env dist/datos/cargar-datos.js',LOAD_NOTE),command('Carga los IDs reales','. ./ids-aula.env\nprintf \'Obra principal: %s\\nOtro ayuntamiento: %s\\n\' "$OBRA_1_ID" "$AYUNTAMIENTO_2_ID"',IDS_NOTE)],expect='Hay dos ayuntamientos y tres obras de ejemplo. La tabla impresa por find() muestra sus IDs reales; ids-aula.env permite usarlos en las pruebas.')
        if id.startswith('caso-'):
            chapter=int(id[5:]);phase['blocks']=[b for b in phase['blocks']if 'psql 'not in b.get('code','')]
            for b in phase['blocks']:
                if chapter==1 and b['kind']=='command'and any(name in b['code']for name in ['REGISTRO_PRUEBA_ID','OBRA_PRUEBA_ID']):
                    b['code']=b['code'].replace('-d \'{"nombre":"Registro de prueba","presupuestoEuros":3001,"ayuntamientoId":2}\'', '-d "{\\"nombre\\":\\"Registro de prueba\\",\\"presupuestoEuros\\":3001,\\"ayuntamientoId\\":$AYUNTAMIENTO_2_ID}"')
                if chapter in NEST_TESTS and b['kind']=='command'and 'curl 'in b['code']:b['code']=NEST_TESTS[chapter]
            phase['blocks'].insert(0,command('Terminal 2 · recupera los IDs de tu proyecto','. ./ids-aula.env',IDS_NOTE))
            if chapter in [3,4,5]:phase['expect']={3:'La obra principal tiene presupuesto 15000 y conserva su ayuntamiento.',4:'La obra principal pasa al segundo ayuntamiento y conserva su presupuesto 15000.',5:'La respuesta incluye el segundo ayuntamiento y la obra principal; el filtro excluye las otras dos obras.'}[chapter]
        if id=='caso-1':phase['expect']='El alta devuelve un ID real y el listado pasa de tres a cuatro obras. Conserva ese ID para el borrado.'
        if id=='caso-2':phase['expect']='Se elimina únicamente la obra de prueba. Siguen las tres obras originales con sus datos y relaciones.'
        if id=='guardar':phase['expect']='La obra principal conserva presupuesto 15000 y pertenece al segundo ayuntamiento. Tu código está en tu GitHub, sin credenciales.'
        if id=='guardar':phase['blocks'][0]=command('Comprueba el listado desde tu aplicación','curl -i http://localhost:3000/obras','La petición pasa por Controller → Service → Entity. find() realiza la lectura y TypeORM genera la consulta.')

def training(data):
    if data['context']['id']!='CH-22':return
    for s in data['steps']['nest']:
        if s['scene']=='result':
            note='\n\nEjemplo visual: los números ilustran la traza. Para ejecutar sobre tu base, abre Preparar y ejecutar y utiliza los IDs reales de ids-aula.env.'
            if note not in s['code']:s['code']+=note

def set_code(stage,code,specs):
    stage['code']=code;stage['cues']=[]
    for token,note in specs:
        start=code.index(token);stage['cues'].append(dict(token=token,start=start,end=start+len(token),note=note))

def nm(data,files):
    if data['caseId']!='CH-22':return
    data['ormDataRevision']=1
    data['ormDataRevisedIds']=['datos','cargar','persistencia']+[s['id']for s in data['tracks']['nest']if s['id'].endswith('-curl')]
    tests={
      'asignar-profesional-curl':'curl -i -X POST "http://localhost:3000/obras/$OBRA_2_ID/asignaciones" \\\n  -H \'Content-Type: application/json\' \\\n  -d "{\\"profesionalId\\":$PROFESIONAL_2_ID,\\"rol\\":\\"Arquitecta\\"}"',
      'listar-por-obra-curl':'curl -i "http://localhost:3000/obras/$OBRA_1_ID/asignaciones"',
      'listar-por-profesional-curl':'curl -i "http://localhost:3000/profesionales/$PROFESIONAL_1_ID/asignaciones"',
      'modificar-rol-curl':'curl -i -X PATCH "http://localhost:3000/obras/$OBRA_1_ID/asignaciones/$PROFESIONAL_1_ID" \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{"rol":"Jefe de equipo"}\'',
      'eliminar-asignacion-curl':'curl -i -X DELETE "http://localhost:3000/obras/$OBRA_1_ID/asignaciones/$PROFESIONAL_1_ID"'
    }
    expectations={
      3:'POST devuelve el ID real del nuevo profesional; GET muestra los dos perfiles iniciales y a Lucía.',
      4:'Se crea el vínculo de la segunda obra con Ana. Repetir esa pareja devuelve 409 y conserva el rol anterior.',
      5:'La obra principal devuelve sus dos profesionales y sus roles.',
      6:'Diego devuelve sus vínculos con la obra principal y la secundaria.',
      7:'Solo el vínculo de la obra principal con Diego cambia a Jefe de equipo.',
      8:'Se elimina solo ese vínculo; se conservan las obras, los profesionales y los otros tres vínculos.'
    }
    for s in data['tracks']['nest']:
        id=s['id']
        if s['chapter']in expectations:s['expect']=expectations[s['chapter']]
        if id=='retomar':s['expect']='Terminal 1: Nest sigue ejecutándose. Terminal 2: /salud y /obras devuelven HTTP 200. Se conservan las tres obras; «Mejora de acera» mantiene presupuesto 15000 y pertenece al segundo ayuntamiento. Las fichas dibujan IDs de ejemplo; las pruebas usan los IDs reales generados en tu proyecto.'
        if id=='datos':
            s.update(title='Prepara los vínculos con TypeORM',path=NM_LOAD_PATH,create='mkdir -p src/datos\ntouch '+NM_LOAD_PATH+'\ncode '+NM_LOAD_PATH,note=LOAD_NOTE+' La base 1:N debe estar preparada; este archivo utiliza sus obras existentes.',expect='El archivo usa los modelos Profesional y Asignacion con save() y find().')
            set_code(s,NM_LOAD,[('db.getRepository(Profesional)','Utiliza la Entity Profesional.'),('profesionales.save({','Crea el profesional y recibe su ID generado.'),('if (!existente) await asignaciones.save(datos);','Guarda cada vínculo solo si no existe. No modifica otros vínculos.'),('asignaciones.find({','TypeORM consulta las asignaciones y muestra el resultado.')])
        if id=='cargar':
            s.update(title='Carga los vínculos y sus IDs reales',note=IDS_NOTE,expect='Ves tres vínculos iniciales. Las variables guardan los IDs reales de las obras y de Diego y Ana.')
            set_code(s,'npm run build\nnode --env-file=.env dist/datos/cargar-datos-nm.js\n. ./ids-aula.env',[('node --env-file=.env dist/datos/cargar-datos-nm.js','Ejecuta el archivo compilado con la conexión de tu .env. save() escribe y find() lee.'),('. ./ids-aula.env','Carga los IDs reales en esta terminal para los curl siguientes.')])
        if id.endswith('-curl'):
            code=tests.get(id,s['code']);code='. ./ids-aula.env\n'+code
            s['note']=IDS_NOTE+' Mantén Nest abierto en la Terminal 1.'
            set_code(s,code,[('. ./ids-aula.env','Recupera los IDs de tu base, sin escribir números a mano.'),('curl','La petición recorre Controller → Service → Entity.')])
            s['expect']={'asignar-profesional-curl':'Se crea el vínculo de la segunda obra con Ana. Repetir esa pareja devuelve 409.', 'listar-por-obra-curl':'La obra principal devuelve sus dos profesionales y sus roles.', 'listar-por-profesional-curl':'Diego devuelve sus vínculos con la obra principal y la secundaria.', 'modificar-rol-curl':'Solo el vínculo de la obra principal con Diego cambia a Jefe de equipo.', 'eliminar-asignacion-curl':'HTTP 204. Desaparece solo ese vínculo; se conservan las obras, los profesionales y los otros tres vínculos.'}.get(id,s['expect'])
        if id=='persistencia':
            s['note']='Comprueba desde las rutas de lectura de tu aplicación. Sus Services utilizan find() sobre Asignacion.';s['expect']='La obra principal conserva el vínculo con Ana; Diego conserva el de la segunda obra. Las obras y los profesionales siguen existiendo.'
            set_code(s,'. ./ids-aula.env\ncurl -i "http://localhost:3000/obras/$OBRA_1_ID/asignaciones"\ncurl -i "http://localhost:3000/profesionales/$PROFESIONAL_1_ID/asignaciones"\ncurl -i http://localhost:3000/obras\ncurl -i http://localhost:3000/profesionales',[('curl','Lee el resultado a través de Controller y Service. TypeORM genera la consulta.')])
    files.pop('datos-iniciales.sql',None);files.pop('datos-nm.sql',None)
    files['src/app.module.ts']=clean_health(files['src/app.module.ts'])
    files[LOAD_PATH]=LOAD+'\n';files[NM_LOAD_PATH]=NM_LOAD+'\n'
