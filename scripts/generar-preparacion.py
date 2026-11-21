"""Preparación CH-22. Reutiliza los archivos del taller sin cambiar sus puzles.

Las bases contienen solo arranque/conexión, nunca los casos resueltos.
Los archivos de negocio se leen de la misma fuente del taller aprobado.
"""
from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parents[1]
FESTIVAL = ROOT.parent / 'festival-checkin-01'
D = json.loads((ROOT/'entrenar/casos/CH-22.json').read_text())
C = D['context']
BASE = 'cd "$HOME/proyectos-serverless/mi-taller"'
NEST = BASE + '/mi-practica/nest'

def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.rstrip()+'\n')

def dump(value): return json.dumps(value, ensure_ascii=False, indent=2)+'\n'

nest_package = {
    'name':'taller-nest', 'version':'1.0.0', 'private':True,
    'engines':{'node':'>=20.19.4'},
    'scripts':{'build':'tsc -p tsconfig.json',
               'start':'node --env-file=.env dist/main.js'},
    'dependencies':{'@nestjs/common':'11.2.8','@nestjs/core':'11.2.8',
                    '@nestjs/platform-express':'11.2.8','@nestjs/typeorm':'11.0.3',
                    'typeorm':'0.3.31','pg':'8.23.1','reflect-metadata':'0.2.2','rxjs':'7.8.2'},
    'devDependencies':{'typescript':'5.9.3','@types/node':'22.20.5'}
}
cloud_package = json.loads((FESTIVAL/'package.json').read_text())
cloud_package['name']='taller-serverless'
cloud_package['scripts']={'deploy':'node ./node_modules/serverless/bin/serverless.js deploy',
    'info':'node ./node_modules/serverless/bin/serverless.js info',
    'invoke':'node ./node_modules/serverless/bin/serverless.js invoke',
    'package':'node ./node_modules/serverless/bin/serverless.js package'}
TSC = {'compilerOptions':{'module':'commonjs','target':'ES2022','outDir':'dist','rootDir':'src',
    'strict':True,'experimentalDecorators':True,'emitDecoratorMetadata':True,
    'esModuleInterop':True,'skipLibCheck':True},'include':['src/**/*.ts']}
MAIN = """import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(Number(process.env.PORT || 3000), '0.0.0.0');
}

bootstrap();"""
NEUTRAL = """import { Controller, Get, Module } from '@nestjs/common';

@Controller('salud')
class SaludController {
  @Get()
  salud() {
    return { estado: 'ok', etapa: 'base-neutral' };
  }
}

@Module({ controllers: [SaludController] })
export class AppModule {}"""
ENV = 'DB_HOST=localhost\nDB_PORT=5432\nDB_USER=postgres\nDB_PASSWORD=123456\nDB_NAME=control_databridge\nPORT=3000'

def app_module(models=False):
    return """import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
""" + ("import { TallerModule } from './taller.module';\n" if models else '') + """
@Controller('salud')
class SaludController {
  constructor(private readonly db: DataSource) {}

  @Get()
  async salud() {
    const [resultado] = await this.db.query('SELECT current_database() AS base');
    return { estado: 'ok', base: resultado.base };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true // Solo en esta base de práctica.
    })""" + (',\n    TallerModule' if models else '') + """
  ],
  controllers: [SaludController]
})
export class AppModule {}"""

def modules(chapter=0):
    imports=["import { Module } from '@nestjs/common';", "import { TypeOrmModule } from '@nestjs/typeorm';",
             "import { Ayuntamiento } from './ayuntamientos/entities/ayuntamiento.entity';",
             "import { Obra } from './obras/entities/obra.entity';"]
    classes={'Controller':[], 'Service':[], 'Repository':[]}
    for s in D['steps']['nest']:
        if not 1 <= s['chapter'] <= chapter or not s['path'].endswith('.ts'): continue
        kind=s['name']
        name=re.search(r'export class (\w+)',s['code']).group(1)
        path=s['path'][4:-3]
        imports.append(f"import {{ {name} }} from './{path}';")
        classes[kind].append(name)
    providers=classes['Service']+classes['Repository']
    return '\n'.join(imports)+"\n\n@Module({\n  imports: [TypeOrmModule.forFeature([Ayuntamiento, Obra])],\n  controllers: ["+', '.join(classes['Controller'])+"],\n  providers: ["+', '.join(providers)+"]\n})\nexport class TallerModule {}"

DYNAMO = """import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true }
});"""
SALUD = """export async function handler() {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ estado: 'ok', etapa: 'base-neutral' })
  };
}"""
HEADER = """service: taller-ch22
frameworkVersion: '3.40.0'

provider:
  name: aws
  runtime: nodejs22.x
  region: ${env:AWS_REGION}
  stage: ${env:TALLER_EQUIPO}
  iam:
    role: ${env:LAMBDA_ROLE_ARN}
  httpApi:
    payload: '2.0'
    cors: true
"""
HEALTH_YAML = """  salud:
    handler: src/salud/handler.handler
    events:
      - httpApi: { method: GET, path: /salud }
"""

def yaml_file(chapter=None):
    if chapter is None: return HEADER+'\nfunctions:\n'+HEALTH_YAML
    resource = D['steps']['cloud'][1]['code']
    provider, resources = resource.split('\nresources:',1)
    env = provider.split('  environment:',1)[1]
    resources = resources.replace('TableName: AYUNTAMIENTOS', 'TableName: AYUNTAMIENTOS_${self:provider.stage}')
    resources = resources.replace('TableName: OBRAS', 'TableName: OBRAS_${self:provider.stage}')
    text=D['steps']['cloud'][5]['code']
    # En una colección YAML inline, una ruta con {param} necesita comillas.
    text=re.sub(r'path: (/[^\s,]+)(?=\s*})', r"path: '\1'", text)
    chunks=re.findall(r'^  (\w+):\n(.*?)(?=^  \w+:\n|\Z)', text, re.M|re.S)
    cut={0:0,1:2,2:3,3:4,4:5,5:6}[chapter]
    functions=''.join('  '+key+':\n'+body for key,body in chunks[:cut])
    return HEADER+'  environment:'+env+'\n\nfunctions:\n'+HEALTH_YAML+functions+'\nresources:'+resources+'\n'

ignore='node_modules/\ndist/\n.serverless/\n.env\n.env.*\n!.env.example\nrespuesta*.json\nobra-creada.json'
for name, files in {
    'taller-nest':{'package.json':dump(nest_package),'tsconfig.json':dump(TSC),
                  '.env.example':ENV,'.gitignore':ignore,'src/main.ts':MAIN,'src/app.module.ts':NEUTRAL},
    'taller-serverless':{'package.json':dump(cloud_package),'.gitignore':ignore,
                       'serverless.yml':yaml_file(),'src/salud/handler.mjs':SALUD,'src/datos/dynamo.mjs':DYNAMO}
}.items():
    for path,code in files.items(): write(FESTIVAL/'bases'/name/path,code)

# Reutilizar el lockfile comprobado del proyecto AWS, sin resolver otros peers.
cloud_lock = json.loads((FESTIVAL/'package-lock.json').read_text())
cloud_lock['name'] = cloud_package['name']
cloud_lock['packages']['']['name'] = cloud_package['name']
write(FESTIVAL/'bases/taller-serverless/package-lock.json',dump(cloud_lock))

SEED = """INSERT INTO "AYUNTAMIENTO" ("ID", "NOMBRE") VALUES
  (1, 'Ayuntamiento del Río'),
  (2, 'Ayuntamiento del Valle')
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "OBRA" ("ID", "NOMBRE", "PRESUPUESTO_EUROS", "ID_AYUNTAMIENTO") VALUES
  (7, 'Mejora de acera', 3000, 1),
  (8, 'Zona de sombra', 12000, 2),
  (9, 'Mejora de acera · nuevo', 18000, 1)
ON CONFLICT ("ID") DO NOTHING;

SELECT setval(pg_get_serial_sequence('"AYUNTAMIENTO"', 'ID'),
              (SELECT MAX("ID") FROM "AYUNTAMIENTO"), true);
SELECT setval(pg_get_serial_sequence('"OBRA"', 'ID'),
              (SELECT MAX("ID") FROM "OBRA"), true);

SELECT * FROM "AYUNTAMIENTO" ORDER BY "ID";
SELECT * FROM "OBRA" ORDER BY "ID";"""

def cmd(title, code, explain='', terms=None):
    return {'kind':'command','title':title,'code':code.replace("%s\n'", "%s\\n'"),'explain':explain,'terms':terms or []}
def file(path, code, explain='', terms=None):
    parent=str(Path(path).parent)
    commands=(f'mkdir -p {parent}\nls -d {parent}\n' if parent!='.' else '')+f'touch {path}\ncode {path}'
    return {'kind':'file','title':path,'path':path,'create':commands,'code':code.replace("%s\n'", "%s\\n'"),'explain':explain,'terms':terms or []}
def step(id,title,lead,where,blocks,expect,scene,nodes,workshop=None):
    return dict(id=id,title=title,lead=lead,where=where,blocks=blocks,expect=expect,
                scene=scene,nodes=nodes,workshop=workshop)

COMMON = step('repositorio','Tu carpeta y tu GitHub',
    'Prepara una copia tuya. Las bases nuevas contienen solo el arranque; construirás las entidades y los casos en tu práctica.',
    'Git Bash en Windows o Terminal en macOS · primera vez',[
      cmd('Crea la carpeta y clona', '''printf 'Tu carpeta personal: %s\n' "$HOME"
mkdir -p "$HOME/proyectos-serverless"
cd "$HOME/proyectos-serverless"
git clone --branch main --single-branch https://github.com/albertohdezakkari/festival-checkin-01.git mi-taller
cd mi-taller
ls bases/taller-nest bases/taller-serverless
code .''', '$HOME existe en Git Bash y macOS: apunta a tu carpeta personal. git clone crea mi-taller. Si ya existe, entra en ella y usa git pull; no clones otra vez encima.',
          [['$HOME','Tu carpeta de usuario: /c/Users/… en Git Bash; /Users/… en macOS.'],['git clone','Descarga el repositorio y crea la carpeta mi-taller.']]),
      cmd('Conecta tu repositorio vacío', '''printf 'Pega la URL HTTPS de tu repositorio GitHub vacío: '
IFS= read -r MI_REPOSITORIO
git remote set-url origin "$MI_REPOSITORIO"
git remote -v
git push -u origin main''','Crea primero un repositorio vacío en tu cuenta, sin README. En remote -v debe salir tu usuario. El push requiere iniciar sesión en tu propia cuenta de GitHub. El código antiguo de Festival queda en la raíz como ejemplo: aquí trabajarás dentro de mi-practica, no ejecutarás su npm run aula.')],
    'Ves las dos bases y origin apunta a tu cuenta. Si tu copia es anterior a esta preparación, trae las bases con git pull https://github.com/albertohdezakkari/festival-checkin-01.git main y sube el cambio a tu origin.',
    'workspace', ['Tu ordenador','Tu repositorio GitHub','bases/','mi-practica/'])

nest=[COMMON,
 step('base','Arranca la base Nest','Comprueba primero el proceso Nest. Todavía no estás comprobando PostgreSQL.',
    '$HOME/proyectos-serverless/mi-taller · Git Bash / Terminal',[
     cmd('Copia la base · solo la primera vez', BASE+'''\nmkdir -p mi-practica/nest
cp -R -n bases/taller-nest/. mi-practica/nest/
cd mi-practica/nest
pwd
node --version
npm --version
npm ci --include=dev
cp -n .env.example .env
code .env''','Necesitas Node 20.19.4 o superior. cp -n conserva los archivos que ya existan. Si ya existe mi-practica/nest, entra en ella; no repitas cp -R ni sobrescribas tu .env.',
       [['npm ci','Instala las versiones exactas de package-lock.json.'],['.env.example','Plantilla que sí se guarda en Git.'],['.env','Tu configuración real, excluida de Git.']]),
     file('.env',ENV,'El script start usa node --env-file=.env: carga este archivo. No carga automáticamente .env.example.'),
     cmd('Terminal 1 · compila y deja Nest abierto','npm run build\nnpm run start','Cada vez que cambies TypeScript: Ctrl+C, npm run build y npm run start.'),
     cmd('Terminal 2 · comprueba el proceso',NEST+'\ncurl -i http://localhost:3000/salud')],
    'HTTP 200 y {"estado":"ok","etapa":"base-neutral"}. Esto confirma que Nest escucha en el puerto 3000; no confirma conexión a la base de datos.',
    'process',['Terminal 1','main.ts','AppModule','GET /salud']) ,
 step('postgres','Prepara PostgreSQL','PostgreSQL es otro proceso: debe estar instalado y arrancado antes de conectar Nest.',
    'Otra terminal Git Bash / Terminal · PostgreSQL local',[
      cmd('Comprueba herramientas y abre psql','psql --version\npsql -h localhost -p 5432 -U postgres -d postgres -W','En Windows instala PostgreSQL con usuario postgres y contraseña 123456. Instala también Command Line Tools y añade su carpeta bin al PATH de Git Bash; reinicia la terminal. En macOS usa tu instalación PostgreSQL y arráncala. La contraseña se configura en el servidor, no al escribir .env.'),
      cmd('Dentro de psql · crea la base','CREATE DATABASE control_databridge;\n\\q','Este bloque es SQL dentro de psql, no Bash. Si la base ya existe, continúa sin borrarla.'),
      cmd('Desde Git Bash · verifica la base',"psql -h localhost -p 5432 -U postgres -d control_databridge -W -c 'SELECT current_database();'")],
    'SELECT current_database() devuelve control_databridge. Si psql no existe, instala sus herramientas; si connection refused, inicia PostgreSQL. No cambies al siguiente paso hasta poder conectar.',
    'database',['Nest :3000','PostgreSQL :5432','postgres / 123456','control_databridge']),
 step('conexion','Conecta Nest con PostgreSQL','Ahora sí, /salud hará una consulta SQL. No necesita todavía las entidades del caso.',
    'mi-practica/nest · Terminal 1 detenida con Ctrl+C',[
      file('src/app.module.ts',app_module(),
           'forRoot abre la conexión usando .env; autoLoadEntities recogerá las entidades registradas después. synchronize se usa solo en esta base de práctica.',
           [['TypeOrmModule.forRoot','Configura la conexión de esta aplicación con PostgreSQL.'],['process.env.DB_NAME','Lee DB_NAME de .env, cargado por npm run start.'],['SELECT current_database()','La respuesta prueba una consulta real a PostgreSQL.']]),
      cmd('Compila y arranca','npm run build\nnpm run start'),
      cmd('Terminal 2 · prueba la conexión','curl -i http://localhost:3000/salud')],
    'HTTP 200 y {"estado":"ok","base":"control_databridge"}. Ahora la respuesta confirma conexión SQL real.',
    'connection',['.env','forRoot','DataSource','SELECT → /salud']),
 step('modelos','Lleva tu modelo al proyecto','Estudia las Entities en Entrenar. Después crea estos mismos archivos y registra solo las entidades: aún no importes los cinco casos.',
    'mi-practica/nest · Terminal 1 detenida',[
      file(C['parent']['file'],D['steps']['nest'][1]['code']),
      file(C['child']['file'],D['steps']['nest'][2]['code']),
      file('src/taller.module.ts',modules(),'Esta es la versión inicial. El módulo completo de la ficha representa el resultado final; iremos añadiendo sus imports a medida que existan los archivos.'),
      file('src/app.module.ts',app_module(True),'AppModule importa TallerModule; este registra Ayuntamiento y Obra con forFeature. Así autoLoadEntities puede encontrarlas.'),
      cmd('Compila y arranca','npm run build\nnpm run start'),
      cmd('Terminal 2 · mira las tablas',"psql -h localhost -p 5432 -U postgres -d control_databridge -W -c '\\dt'")],
    'Nest arranca sin imports inexistentes. PostgreSQL contiene AYUNTAMIENTO y OBRA, con la referencia ID_AYUNTAMIENTO.',
    'model',['AppModule','TallerModule','Ayuntamiento 1','Obra 0..N'],{'track':'nest','index':1}),
 step('datos','Carga los datos de tu ficha','Los casos empiezan con dos ayuntamientos y las obras 7, 8 y 9. Carga esos datos después de crear las tablas.',
    'mi-practica/nest · Terminal 2',[
      file('datos-iniciales.sql',SEED,'Las comillas dobles conservan los nombres en mayúsculas. setval coloca las secuencias detrás del ID mayor ya cargado: la siguiente obra será la 10.'),
      cmd('Ejecuta el archivo SQL','psql -h localhost -p 5432 -U postgres -d control_databridge -W -f datos-iniciales.sql')],
    'Ves 2 ayuntamientos y 3 obras: 7→1, 8→2, 9→1; presupuestos 3000, 12000 y 18000. No hay que ejecutar npm run aula de Festival.',
    'records',['Ayuntamiento 1','Obras 7 y 9','Ayuntamiento 2','Obra 8'])
]

cloud=[COMMON,
 step('codespace','Abre tu Codespace','Abre GitHub en tu repositorio propio: Code → Codespaces → Create codespace on main. El nombre real de /workspaces puede variar; usa el Explorer para abrir la raíz de tu copia.',
    'Terminal Bash de tu Codespace · raíz de tu repositorio',[
      cmd('Reconoce la copia y crea tu proyecto','''pwd
git remote get-url origin
git branch --show-current
ls bases/taller-serverless
mkdir -p mi-practica/serverless
cp -R -n bases/taller-serverless/. mi-practica/serverless/
cd mi-practica/serverless
pwd
node --version
npm ci --include=dev
npm ls serverless --depth=0''','Si mi-practica/serverless ya existe, entra en ella sin repetir cp. Node 20 o superior; si tu Codespace no tiene una versión compatible: nvm install 22 y nvm use 22, cada orden en su línea. Serverless debe mostrar 3.40.0 local; no pide login de Serverless.',
      [['npm ls serverless --depth=0','Muestra la versión de Serverless instalada en este proyecto.'],['mi-practica/serverless','Este package.json y este serverless.yml son independientes del Festival de la raíz.']]),
      cmd('Si faltan las bases en una copia antigua','git pull https://github.com/albertohdezakkari/festival-checkin-01.git main\ngit push origin main','Solo desde la raíz del repositorio y con tus cambios guardados. Después vuelve al primer bloque.')],
    'Estás dentro de mi-practica/serverless; origin es tu cuenta y npm ls muestra serverless@3.40.0. Las funciones del contexto aún no están creadas.',
    'workspace',['Tu GitHub','Codespace','mi-practica/serverless','Serverless 3.40.0']),
 step('aws','Instala AWS CLI y prepara tu sesión','Serverless usa AWS para desplegar. Necesitas las tres credenciales temporales de tu Learner Lab, fuera del repositorio.',
    'Terminal del Codespace · mi-practica/serverless',[
      cmd('Comprueba AWS CLI','aws --version','Si aparece aws-cli/2…, continúa sin instalarlo.'),
      cmd('Solo si aws no existe','curl -fsSL https://awscli.amazonaws.com/v2/install.sh -o /tmp/instalar-aws.sh\nsudo bash /tmp/instalar-aws.sh --system\nhash -r\naws --version','La instalación se realiza en el Codespace. Este archivo no forma parte de tu proyecto.'),
      cmd('Abre el archivo de credenciales','mkdir -p "$HOME/.aws"\ntouch "$HOME/.aws/credentials"\nchmod 600 "$HOME/.aws/credentials"\ncode "$HOME/.aws/credentials"','En Academy: Start Lab → AWS Details → AWS CLI. Copia las tres líneas reales con la cabecera [default]. Si ya utilizas [academy], conserva esa cabecera y elige academy aquí. Nunca copies credenciales a GitHub.'),
      cmd('Selecciona tu sesión y comprueba acceso','export AWS_PROFILE={{PROFILE}}\nexport AWS_REGION=us-east-1\nexport TALLER_EQUIPO={{TEAM}}\naws sts get-caller-identity','Elige el perfil y tu código de equipo arriba. AWS CLI lee AWS_PROFILE y AWS_REGION: no tienes que repetirlos en cada consulta.',
       [['AWS_PROFILE','Nombre de la sección [default] o [academy] en ~/.aws/credentials.'],['AWS_REGION','Región donde crearás tus recursos: us-east-1.'],['TALLER_EQUIPO','Identifica tu stack y tus tablas en una cuenta compartida. No genera IDs de registros.']])],
    'STS devuelve tu Account y Arn. Si devuelve ExpiredToken, renueva las tres credenciales del laboratorio y repite STS.',
    'credentials',['Learner Lab','~/.aws/credentials','AWS_PROFILE','STS: sesión válida']),
 step('rol','Obtén el rol y lee tu YAML','LabRole es el rol que Lambda utiliza al ejecutarse. Tu perfil de terminal y el rol de la función cumplen tareas distintas.',
    'La misma terminal del Codespace',[
      cmd('Lee el ARN de LabRole','LAMBDA_ROLE_ARN="$(aws iam get-role --role-name LabRole --query \'Role.Arn\' --output text)"\nexport LAMBDA_ROLE_ARN\nprintf \'Rol de Lambda: %s\\n\' "$LAMBDA_ROLE_ARN"','aws iam get-role consulta un rol existente. --query extrae Role.Arn; $(...) guarda la salida. export permite que Serverless lea la variable. printf solo la muestra.',
       [['--role-name LabRole','Nombre del rol ya creado por el laboratorio.'],['--query \'Role.Arn\'','Selecciona el ARN del rol en la respuesta.'],['export','Hace visible esta variable a los procesos que arrancas desde la terminal.']]),
      cmd('Solo si el laboratorio deniega iam:GetRole','printf \'Pega el ARN completo de LabRole que te facilite el profesor: \'\nIFS= read -r LAMBDA_ROLE_ARN\nexport LAMBDA_ROLE_ARN','Usa este bloque como alternativa al anterior. No inventes un ARN ni un número de cuenta.'),
      file('serverless.yml',yaml_file(),'Este primer archivo solo tiene salud. ${env:…} lee tu terminal. Más adelante ${self:provider.stage} lee el stage definido en este mismo YAML.',
       [['${env:TALLER_EQUIPO}','Lee el valor exportado en la terminal.'],['role: ${env:LAMBDA_ROLE_ARN}','Asigna a Lambda el rol que ya autorizó el laboratorio.']]),
      cmd('Revisa los valores antes de desplegar',"printf 'Perfil: %s\\nRegión: %s\\nEquipo: %s\\nRol: %s\\n' \"$AWS_PROFILE\" \"$AWS_REGION\" \"$TALLER_EQUIPO\" \"$LAMBDA_ROLE_ARN\"",'printf no crea ni valida recursos; muestra qué valores usará el YAML. Si falta alguno, vuelve al paso que lo define.')],
    'Perfil, región, equipo y rol tienen valor. Tu YAML solo apunta al handler de salud que ya existe en la base.',
    'role',['Tu perfil AWS','Serverless','LabRole','Lambda']),
 step('desplegar','Despliega y comprueba salud','Prueba primero que puedes desplegar una función pequeña antes de añadir las tablas y los casos.',
    'mi-practica/serverless · terminal con las variables exportadas',[
      cmd('Empaqueta, despliega y consulta','npm run package\nnpm run deploy\nnpm run info','package prepara CloudFormation y el código sin crear recursos. deploy los crea en AWS. Serverless 3 puede avisar que no reconoce nodejs22.x en su esquema antiguo: el resultado que cuenta es el final del despliegue.'),
      cmd('Obtén la URL del stack', '''API_URL="$(aws cloudformation describe-stacks --stack-name "taller-ch22-${TALLER_EQUIPO}" --query 'Stacks[0].Outputs[?OutputKey==`HttpApiUrl`].OutputValue | [0]' --output text)"
export API_URL
printf 'URL de tu API: %s\n' "$API_URL"
curl -i "$API_URL/salud"''','Outputs contiene los valores que CloudFormation devuelve después del despliegue. API_URL es la dirección real de tu API; todavía no existía al preparar el YAML.'),
      cmd('Invoca la misma Lambda sin API Gateway','npm run invoke -- --function salud --data \'{}\'','invoke llama directamente a Lambda. curl entra por HTTP API. Ambos llegan al mismo handler de salud.')],
    'Despliegue terminado y curl devuelve HTTP 200, estado ok y etapa base-neutral. Invoke devuelve statusCode 200 y el body con esos mismos datos.',
    'deploy',['serverless.yml','CloudFormation','HTTP API /salud','Lambda salud']),
 step('modelos','Crea las tablas, Table y Entity','Las dos tablas del contexto pertenecen a tu stack. Table describe cómo acceder a ellas; Entity relaciona los nombres del código con los atributos guardados.',
    'mi-practica/serverless · antes del primer caso',[
      file('serverless.yml',yaml_file(0),'Versión completa: incluye proveedor, rol, variables, salud y recursos. La ficha usa AYUNTAMIENTOS/OBRAS; aquí el nombre físico añade tu equipo para compartir cuenta sin colisiones. Las claves, campos y el índice son los mismos.',
       [['${self:provider.stage}','Lee provider.stage de este mismo YAML.'],['Ref: TablaObras','CloudFormation devuelve el nombre real y lo entrega a la variable TABLA_OBRAS de Lambda.'],['ProjectionType: INCLUDE','El índice copia sus claves y los campos de NonKeyAttributes; no define todas las columnas de la tabla.']]),
      file('src/datos/dynamo.mjs',DYNAMO,'El cliente se crea una vez al cargar el módulo. En Lambda usa región y permisos del entorno de ejecución: no contiene claves AWS.'),
      file(C['modelFile'],D['steps']['cloud'][2]['code'],'Estos son exactamente los modelos de tu ficha. process.env.TABLA_OBRAS recibe el Ref del YAML. Table y Entity no crean la tabla.',
       [['entityAttribute: false','Toolbox no añade su etiqueta interna de tipo de entidad.'],['timestamps: false','Toolbox no añade fechas automáticas. Los campos de tu ficha se conservan.'],["savedAs('OBRA_ID')",'obraId en JavaScript se guarda como OBRA_ID en DynamoDB.']]),
      cmd('Crea los recursos','npm run deploy\naws dynamodb describe-table --table-name "OBRAS_${TALLER_EQUIPO}" --query \'Table.{Tabla:TableName,Claves:KeySchema,Indices:GlobalSecondaryIndexes[*].IndexName}\' --output json')],
    'Existen AYUNTAMIENTOS_tuEquipo y OBRAS_tuEquipo. OBRAS tiene PK OBRA_ID e índice PorAyuntamiento. Aún no hay filas.',
    'model',['YAML: tablas + Ref','dynamo.mjs: cliente','Table: claves + índice','Entity: todos los campos'],{'track':'cloud','index':2})
]

seed_statements=[
 ('Ayuntamiento 1',"INSERT INTO \"AYUNTAMIENTOS_${TALLER_EQUIPO}\" VALUE {'AYUNTAMIENTO_ID':1,'NOMBRE':'Ayuntamiento del Río'}"),
 ('Ayuntamiento 2',"INSERT INTO \"AYUNTAMIENTOS_${TALLER_EQUIPO}\" VALUE {'AYUNTAMIENTO_ID':2,'NOMBRE':'Ayuntamiento del Valle'}")]
for row in D['fixtures']:
    seed_statements.append((f"Obra {row['id']}",f'''INSERT INTO "OBRAS_${{TALLER_EQUIPO}}" VALUE {{'OBRA_ID':{row['id']},'NOMBRE':'{row['name']}','PRESUPUESTO_EUROS':{row['value']},'AYUNTAMIENTO_ID':{row['parent']}}}'''))
def partiql(sql, read=False):
    slash=chr(92)
    lines=['aws dynamodb execute-statement '+slash,
           '  --statement "'+sql.replace('"', slash+'"')+'"']
    if read:
        lines[-1]+=' '+slash
        lines.append('  --consistent-read --output json')
    return '\n'.join(lines)

seed_blocks=[]
for title,sql in seed_statements:
    seed_blocks.append(cmd(title, partiql(sql), 'PartiQL INSERT guarda un ítem. Ejecuta este alta una vez; DuplicateItem indica que ya existe. No borres ni sobrescribas los datos de tu práctica.'))
seed_blocks.append(cmd('Comprueba los dos listados',
    partiql('SELECT * FROM "AYUNTAMIENTOS_${TALLER_EQUIPO}"',True)+'\n'+partiql('SELECT * FROM "OBRAS_${TALLER_EQUIPO}"',True),
    'Aquí se muestran los datos reales. En la salida de AWS CLI, N significa Number y S significa String: por eso los números aparecen con una etiqueta de tipo.'))
cloud.append(step('datos','Carga los mismos datos','Utiliza las mismas dos entidades y los mismos registros que en Nest: cambia cómo los guardas y consultas.',
    'mi-practica/serverless · AWS_PROFILE y AWS_REGION exportados',seed_blocks,
    'Dos ayuntamientos y obras 7, 8, 9 con los mismos nombres, presupuestos y referencias que en la ficha.',
    'records',['Ayuntamiento 1','Obras 7 y 9','Ayuntamiento 2','Obra 8']))

CHAPTER_NAMES={1:'Crear y listar obras',2:'Eliminar la obra de prueba',3:'Modificar el presupuesto',4:'Cambiar de ayuntamiento',5:'Consultar por ayuntamiento'}
PAYLOAD={'nombre':'Registro de prueba','presupuestoEuros':3001,'ayuntamientoId':2}
post_json=json.dumps(PAYLOAD,ensure_ascii=False,separators=(',',':'))
def tests(tech,chapter):
    url='http://localhost:3000' if tech=='nest' else '$API_URL'
    if chapter==1:
        id_prop='id' if tech=='nest' else 'obraId'
        return [cmd('Consulta antes de crear',f'curl -i "{url}/obras"'),
          cmd('Crea y conserva el ID que devuelve',f'''curl -fsS -X POST "{url}/obras" \\
  -H 'Content-Type: application/json' \\
  -d '{post_json}' \\
  -o obra-creada.json
cat obra-creada.json
OBRA_PRUEBA_ID="$(node -p 'JSON.parse(require("fs").readFileSync("obra-creada.json", "utf8")).{id_prop}')"
export OBRA_PRUEBA_ID
printf 'Obra creada: %s\\n' "$OBRA_PRUEBA_ID"
curl -i "{url}/obras"''','Conserva el ID real en esta terminal. Nest lo obtiene de PostgreSQL; Serverless usa el Date.now del service de la ficha. No presupongas que el ID será 10 en ambos. El listado Scan de DynamoDB no garantiza orden.')] + ([cmd('Invoke · listar sin HTTP',"npm run invoke -- --function listarObras --data '{}'",'El resultado de Invoke contiene statusCode y body; body es el JSON de la lista dentro de una cadena. No envíes un body a listarHandler: no lo utiliza.')] if tech=='cloud' else [])
    if chapter==2:
        return [cmd('Elimina solo la obra que acabas de crear',f'''printf 'Se va a eliminar la obra de prueba: %s\\n' "$OBRA_PRUEBA_ID"
curl -i -X DELETE "{url}/obras/$OBRA_PRUEBA_ID"
curl -i "{url}/obras"''','Si has abierto otra terminal, recupera el ID real desde obra-creada.json como en el caso anterior. No elimines las obras 7, 8 o 9 de la ficha.')]
    if chapter==3:
        return [cmd('Cambia solo el presupuesto',f'''curl -i -X PATCH "{url}/obras/7" \\
  -H 'Content-Type: application/json' \\
  -d '{{"presupuestoEuros":15000}}'
curl -i "{url}/obras"''')]
    if chapter==4:
        return [cmd('Traslada la obra 7 al ayuntamiento 2',f'''curl -i -X PATCH "{url}/obras/7/ayuntamiento" \\
  -H 'Content-Type: application/json' \\
  -d '{{"ayuntamientoId":2}}'
curl -i "{url}/obras"''')]
    return [cmd('Filtra por ayuntamiento y presupuesto',f'curl -i "{url}/ayuntamientos/2/obras?minimo=12001"',
        'Debe aparecer la obra 7, con 15000. La 8 tiene 12000; la 9 pertenece al ayuntamiento 1. En DynamoDB el GSI se actualiza de forma eventual: si acabas de trasladar, repite la consulta cuando el índice se haya actualizado.')]

for tech, target in [('nest',nest),('cloud',cloud)]:
    for chapter in range(1,6):
        stages=[s for s in D['steps'][tech] if s['chapter']==chapter and s['path'].startswith('src/')]
        blocks=[]
        if tech=='cloud' and chapter==4:
            dependency=next(s for s in D['steps']['cloud'] if s['chapter']==5 and s['name']=='Repository')
            blocks.append(file(dependency['path'],dependency['code'],'Créalo antes del service de Trasladar: este importa buscarAyuntamientoRepository. El handler de consultar se añadirá en el siguiente caso.'))
        for s in stages: blocks.append(file(s['path'],s['code'],'Mismo archivo que estudias en Entrenar. Guarda imports y cierres completos.'))
        if tech=='nest':
            blocks.append(file('src/taller.module.ts',modules(chapter),'Versión acumulativa: solo importa los casos cuyos archivos ya has creado.'))
            blocks.append(cmd('Terminal 1 · reinicia después de guardar','npm run build\nnpm run start','Detén antes el proceso con Ctrl+C. Espera el mensaje de arranque de Nest; ejecuta curl desde la Terminal 2.'))
        else:
            blocks.append(file('serverless.yml',yaml_file(chapter),'Versión acumulativa: rutas y handlers que ya existen. Mantiene las tablas y el equipo del paso de preparación.'))
            blocks.append(cmd('Comprueba sintaxis y despliega','\n'.join('node --check '+s['path'] for s in stages)+'\nnpm run deploy','node --check revisa sintaxis; no ejecuta la función ni prueba la base de datos. deploy publica esta fase.'))
        blocks+=tests(tech,chapter)
        if tech=='nest' and chapter in [3,4]:
            blocks.append(cmd('Confirma presupuesto y FK en SQL',
                "psql -h localhost -p 5432 -U postgres -d control_databridge -W -c "
                + "'SELECT \"ID\", \"PRESUPUESTO_EUROS\", \"ID_AYUNTAMIENTO\" FROM \"OBRA\" WHERE \"ID\" = 7;'",
                'El listado TypeORM no carga la relación automáticamente. Esta consulta muestra la FK real guardada en PostgreSQL.'))
        expectations={1:'GET devuelve 3 obras antes del alta y 4 después. POST devuelve la obra creada; conserva su ID real para eliminarla en el caso 2.',2:'DELETE devuelve HTTP 204; el listado vuelve a tener las obras 7, 8 y 9.',3:'La obra 7 tiene presupuesto 15000 y sigue en el ayuntamiento 1.',4:'La obra 7 mantiene presupuesto 15000 y ahora referencia al ayuntamiento 2.',5:'La respuesta contiene Ayuntamiento del Valle y únicamente la obra 7 (15000).'}
        target.append(step('caso-'+str(chapter),CHAPTER_NAMES[chapter],
             'Observa y monta este caso en Entrenar. Aplica aquí los archivos completos, la configuración de esta fase y su prueba real.',
             'mi-practica/'+('nest · dos terminales' if tech=='nest' else 'serverless · terminal del Codespace'),blocks,
             expectations[chapter], 'trace',
             ['curl / Invoke' if tech=='cloud' else 'curl', 'handler' if tech=='cloud' else 'controller', 'service', 'repository → '+('Entity' if tech=='cloud' else 'PostgreSQL')],
             {'track':tech,'index':next(i for i,s in enumerate(D['steps'][tech]) if s['chapter']==chapter)}))

for tech,target in [('nest',nest),('cloud',cloud)]:
    verify = cmd('Confirma la persistencia en SQL', '''psql -h localhost -p 5432 -U postgres -d control_databridge -W \\
  -c 'SELECT "ID", "NOMBRE", "PRESUPUESTO_EUROS", "ID_AYUNTAMIENTO" FROM "OBRA" ORDER BY "ID";' ''') if tech=='nest' else cmd('Lee lo guardado con PartiQL',
        partiql('SELECT * FROM "OBRAS_${TALLER_EQUIPO}" WHERE OBRA_ID = 7',True))
    target.append(step('guardar','Comprueba y guarda tu trabajo',
        'La respuesta HTTP y lo guardado deben coincidir. Después sube solo los archivos del proyecto a tu GitHub.',
        'Desde tu práctica; los cambios se guardan en el mismo repositorio',[
         verify,
         cmd('Revisa antes de subir','git status --short\ngit add .\ngit diff --cached --stat\ngit commit -m "Construye el taller de Ayuntamiento y Obra"\ngit push origin main','Revisa que .env y ~/.aws/credentials no aparecen en lo preparado para subir. Si no hay cambios, no necesitas otro commit.'),
         cmd('Retoma mañana','''git pull
pwd''','En Nest, inicia PostgreSQL y ejecuta build/start. En Codespaces, recupera el Codespace guardado, renueva las tres credenciales de Academy y exporta de nuevo perfil, región, equipo, rol y API_URL con los pasos anteriores. Detener el Codespace no elimina los recursos AWS.')],
        'La obra 7 conserva presupuesto 15000 y ayuntamiento 2. El repositorio propio contiene tus archivos, sin credenciales. El progreso del cuaderno permanece solo en este navegador.',
        'persist',['Petición','Dato guardado','Tu GitHub','Continuar mañana']))

# Enlaces de herramientas: la explicación y los archivos siguen en el cuaderno.
nest[2]['blocks'][0]['links']=[
    ['Instalar PostgreSQL en Windows','https://www.postgresql.org/download/windows/'],
    ['Instalar PostgreSQL en macOS','https://www.postgresql.org/download/macosx/']]
COMMON['blocks'][1]['links']=[['Crear tu repositorio vacío','https://github.com/new']]
cloud[1]['blocks'][0]['links']=[['Abrir Codespaces en tu repositorio','https://github.com/codespaces/new']]
write(ROOT/'preparar/CH-22.json',dump({'version':1,'caseId':'CH-22',
    'title':C['title'],'profile':'default','team':'equipo01','tracks':{'nest':nest,'cloud':cloud}}))
print(f'Preparación CH-22: {len(nest)} pasos Nest y {len(cloud)} Serverless; bases sin casos de negocio.')
