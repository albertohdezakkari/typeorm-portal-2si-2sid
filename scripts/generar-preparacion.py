"""Genera el acompañamiento de los 31 contextos desde el taller aprobado.

La plantilla común conserva el arranque verificado. Los archivos de negocio,
modelos, datos y rutas se toman de cada ficha, sin modificar entrenar/ ni bases.
"""
from copy import deepcopy
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
COMMON = json.loads((ROOT/'scripts/plantillas/preparacion-comun.json').read_text())
DYNAMO = """import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true }
});"""


def command(title, code, explain=''):
    return dict(kind='command', title=title, code=code.rstrip(), explain=explain, terms=[])


def file(path, code, explain='', terms=None):
    parent = str(Path(path).parent)
    create = (f'mkdir -p {parent}\nls -d {parent}\n' if parent != '.' else '')
    return dict(kind='file', title=path, path=path, code=code.rstrip(),
                create=create+f'touch {path}\ncode {path}', explain=explain, terms=terms or [])


def step(id, title, lead, where, blocks, expect, scene, nodes, workshop=None):
    return dict(id=id, title=title, lead=lead, where=where, blocks=blocks,
                expect=expect, scene=scene, nodes=nodes, workshop=workshop)


def replace_strings(value, before, after):
    if isinstance(value, str):
        return value.replace(before, after)
    if isinstance(value, list):
        return [replace_strings(v, before, after) for v in value]
    if isinstance(value, dict):
        return {k:replace_strings(v, before, after) for k,v in value.items()}
    return value


def sql_string(value):
    return "'"+str(value).replace("'", "''")+"'"


def partiql(sql, consistent=False):
    statement = sql.replace('"', '\\"')
    return 'aws dynamodb execute-statement \\\n  --statement "'+statement+'"'+(' \\\n  --consistent-read --output json' if consistent else '')


def generate(source):
    d = json.loads(source.read_text())
    c = d['context']; parent = c['parent']; child = c['child']; metric = c['metric']
    entities = d['fieldGuide']['entities']
    parent_key = next(f['cloud']['column'] for f in entities[0]['fields'] if f['role']=='key')
    child_key = next(f['cloud']['column'] for f in entities[1]['fields'] if f['role']=='key')
    parent_name = next(f['nest']['column'] for f in entities[0]['fields'] if f['role']=='data')
    service = 'taller-'+c['id'].lower().replace('-', '')
    tracks = replace_strings(deepcopy(COMMON), 'taller-ch22', service)
    nest, cloud = tracks['nest'], tracks['cloud']
    header = next(x for x in cloud if x['id']=='rol')['blocks'][2]['code'].split('\nfunctions:',1)[0]
    health_yaml = "  salud:\n    handler: src/salud/handler.handler\n    events:\n      - httpApi: { method: GET, path: /salud }\n"

    def yaml_file(chapter):
        provider, resources = d['steps']['cloud'][1]['code'].split('\nresources:',1)
        environment = provider.split('  environment:',1)[1]
        for e in (parent, child):
            resources = resources.replace('TableName: '+e['table']+'\n',
                                          'TableName: '+e['table']+'_${env:TALLER_EQUIPO}\n')
        text = d['steps']['cloud'][5]['code']
        text = re.sub(r'path: (/[^\s,]+)(?=\s*})', r"path: '\1'", text)
        chunks = re.findall(r'^  (\w+):\n(.*?)(?=^  \w+:\n|\Z)', text, re.M|re.S)
        cut = {0:0, 1:2, 2:3, 3:4, 4:5, 5:6}[chapter]
        functions = ''.join('  '+key+':\n'+body for key,body in chunks[:cut])
        return header+'\n  environment:'+environment+'\n\nfunctions:\n'+health_yaml+functions+'\nresources:'+resources+'\n'

    def modules(chapter):
        if d.get('nestSimpleRevision'):
            from arturo_nest_sencillo import module_code
            return module_code(chapter)
        imports = ["import { Module } from '@nestjs/common';", "import { TypeOrmModule } from '@nestjs/typeorm';"]
        for e in (parent,child):
            imports.append(f"import {{ {e['entity']} }} from './{e['file'][4:-3]}';")
        classes = {'Controller':[], 'Service':[], 'Repository':[]}
        for s in d['steps']['nest']:
            if not 1 <= s['chapter'] <= chapter or not s['path'].endswith('.ts'):
                continue
            name = re.search(r'export class (\w+)',s['code']).group(1)
            imports.append(f"import {{ {name} }} from './{s['path'][4:-3]}';")
            classes[s['name']].append(name)
        return '\n'.join(imports)+f"\n\n@Module({{\n  imports: [TypeOrmModule.forFeature([{parent['entity']}, {child['entity']}])],\n  controllers: ["+', '.join(classes['Controller'])+"],\n  providers: ["+', '.join(classes['Service']+classes['Repository'])+"]\n})\nexport class TallerModule {}"

    connection = next(x for x in nest if x['id']=='conexion')['blocks'][0]['code']
    app_models = connection.replace("import { DataSource } from 'typeorm';", "import { DataSource } from 'typeorm';\nimport { TallerModule } from './taller.module';")
    app_models = app_models.replace('    })\n', '    }),\n    TallerModule\n')
    nest.append(step('modelos','Lleva tu modelo al proyecto',
        'Estudia las Entities en Entrenar. Después crea estos mismos archivos y registra las entidades antes de importar los casos.',
        'mi-practica/nest · Terminal 1 detenida',[
            file(parent['file'],d['steps']['nest'][1]['code']),
            file(child['file'],d['steps']['nest'][2]['code']),
            file('src/taller.module.ts',modules(0),'Módulo inicial: solo registra las dos entidades; aún no importa casos inexistentes.'),
            file('src/app.module.ts',app_models,'AppModule importa TallerModule, que registra las Entities con forFeature.'),
            command('Compila y arranca','npm run build\nnpm run start'),
            command('Terminal 2 · mira las tablas',"psql -h localhost -p 5432 -U postgres -d control_databridge -W -c '\\dt'")],
        f"Nest arranca sin imports inexistentes. PostgreSQL contiene {parent['sql']} y {child['sql']}, con la referencia {c['foreignKey']}.",
        'model',['AppModule','TallerModule',parent['entity']+' 1',child['entity']+' 0..N'],{'track':'nest','index':1}))

    rows_parent = ',\n'.join(f"  ({i}, {sql_string(name)})" for i,name in enumerate(parent['examples'],1))
    rows_child = ',\n'.join(f"  ({r['id']}, {sql_string(r['name'])}, {r['value']}, {r['parent']})" for r in d['fixtures'])
    seed = f'''INSERT INTO "{parent['sql']}" ("ID", "{parent_name}") VALUES
{rows_parent}
ON CONFLICT ("ID") DO NOTHING;

INSERT INTO "{child['sql']}" ("ID", "{c['text']['column']}", "{metric['column']}", "{c['foreignKey']}") VALUES
{rows_child}
ON CONFLICT ("ID") DO NOTHING;
'''
    for e in (parent,child):
        seed += f'''\nSELECT setval(pg_get_serial_sequence('"{e['sql']}"', 'ID'),
              (SELECT MAX("ID") FROM "{e['sql']}"), true);
SELECT * FROM "{e['sql']}" ORDER BY "ID";\n'''
    records = [parent['entity']+' 1',child['entity']+' 7 y 9',parent['entity']+' 2',child['entity']+' 8']
    nest.append(step('datos','Carga los datos de tu ficha','Carga los dos registros principales y los tres registros asociados de tu ficha.',
        'mi-practica/nest · Terminal 2',[file('datos-iniciales.sql',seed,'setval coloca la secuencia después del ID mayor ya cargado.'),
        command('Ejecuta el archivo SQL','psql -h localhost -p 5432 -U postgres -d control_databridge -W -f datos-iniciales.sql')],
        f"Ves dos registros de {parent['entity']} y tres de {child['entity']}: 7→1, 8→2 y 9→1. Compara {metric['column']} con tu ficha.",'records',records))

    cloud.append(step('modelos','Crea las tablas, Table y Entity',
        'El YAML crea los recursos. Table describe claves e índices y Entity declara los atributos de los ítems.',
        'mi-practica/serverless · antes del primer caso',[
            file('serverless.yml',yaml_file(0),'Archivo completo: proveedor, rol, variables, salud y las dos tablas de tu contexto. El nombre físico añade tu equipo.', [["${env:TALLER_EQUIPO}",'Lee directamente TALLER_EQUIPO, exportado en la terminal.'], ['Ref:', 'CloudFormation devuelve el nombre real de la tabla a la variable de entorno de Lambda.'], ['ProjectionType: INCLUDE', 'El índice copia sus claves y los campos de NonKeyAttributes; no declara todas las columnas de la tabla.']]),
            file('src/datos/dynamo.mjs',DYNAMO,'Cliente de DynamoDB. En Lambda usa la región y los permisos de su entorno, sin claves en el archivo.'),
            file(c['modelFile'],d['steps']['cloud'][2]['code'],'Modelos exactos del taller. Table y Entity no crean las tablas.', [['entityAttribute: false', 'Toolbox no añade su etiqueta interna de tipo de entidad.'], ['timestamps: false', 'Toolbox no añade fechas automáticas; conserva los campos de tu ficha.'], ["savedAs('"+child_key+"')",child['input']+' en JavaScript se guarda como '+child_key+' en DynamoDB.']]),
            command('Crea los recursos','npm run deploy\naws dynamodb describe-table --table-name "'+child['table']+'_${TALLER_EQUIPO}" --query \'Table.{Tabla:TableName,Claves:KeySchema,Indices:GlobalSecondaryIndexes[*].IndexName}\' --output json')],
        f"Existen {parent['table']}_tuEquipo y {child['table']}_tuEquipo. PK del lado N: {child_key}; índice: {c['index']}. Aún no hay ítems.",
        'model',['YAML: tablas + Ref','dynamo.mjs: cliente','Table: claves + índice','Entity: todos los campos'],{'track':'cloud','index':2}))
    seed_blocks = []
    for i,name in enumerate(parent['examples'],1):
        sql = f'''INSERT INTO "{parent['table']}_${{TALLER_EQUIPO}}" VALUE {{'{parent_key}':{i},'{parent_name}':{sql_string(name)}}}'''
        seed_blocks.append(command(f"{parent['entity']} {i}",partiql(sql),'Ejecuta el alta una sola vez. DuplicateItem indica que la clave ya existe.'))
    for r in d['fixtures']:
        sql = f'''INSERT INTO "{child['table']}_${{TALLER_EQUIPO}}" VALUE {{'{child_key}':{r['id']},'{c['text']['column']}':{sql_string(r['name'])},'{metric['column']}':{r['value']},'{parent_key}':{r['parent']}}}'''
        seed_blocks.append(command(f"{child['entity']} {r['id']}",partiql(sql),'Los nombres, valores y referencias son los de tu ficha.'))
    seed_blocks.append(command('Comprueba los dos listados','\n'.join(partiql(f'SELECT * FROM "{e["table"]}_${{TALLER_EQUIPO}}"',True) for e in (parent,child)),
        'En la respuesta de AWS CLI, N significa número y S texto. PartiQL permite escribir la consulta con una sintaxis similar a SQL.'))
    cloud.append(step('datos','Carga los mismos datos','Compara los datos con Nest: mismos registros y referencias en dos tecnologías.',
        'mi-practica/serverless · AWS_PROFILE y AWS_REGION exportados',seed_blocks,
        f"Dos registros de {parent['entity']} y tres de {child['entity']}, con los valores y referencias de tu ficha.",'records',records))

    def tests(tech, chapter):
        url = 'http://localhost:3000' if tech=='nest' else '$API_URL'
        route = url+'/'+child['route']; op = d['operations'][chapter-1]
        if chapter == 1:
            payload = op['request'].split('\n',1)[1]
            id_prop = 'id' if tech=='nest' else child['input']
            result = [command('Consulta antes de crear',f'curl -i "{route}"'),command('Crea y conserva el ID que devuelve',f'''curl -fsS -X POST "{route}" \\
  -H 'Content-Type: application/json' \\
  -d '{payload}' \\
  -o registro-creado.json
cat registro-creado.json
REGISTRO_PRUEBA_ID="$(node -p 'JSON.parse(require("fs").readFileSync("registro-creado.json", "utf8")).{id_prop}')"
export REGISTRO_PRUEBA_ID
printf 'ID creado: %s\\n' "$REGISTRO_PRUEBA_ID"
curl -i "{route}"''','Conserva el ID real en esta terminal. PostgreSQL genera el ID en Nest; Serverless usa Date.now en el service. Scan no garantiza el orden del listado.')]
            if tech=='cloud':
                function_name = re.search(r'^  (\w+):\n    handler: [^\n]+\.listarHandler',d['steps']['cloud'][5]['code'],re.M).group(1)
                result.append(command('Invoke · listar sin HTTP',f"npm run invoke -- --function {function_name} --data '{{}}'",'La respuesta contiene statusCode y body. La función de listar no requiere datos de entrada.'))
            return result
        if chapter == 2:
            return [command('Elimina solo el registro que acabas de crear',f'''printf 'ID de prueba: %s\\n' "$REGISTRO_PRUEBA_ID"
curl -i -X DELETE "{route}/$REGISTRO_PRUEBA_ID"
curl -i "{route}"''','Si cambias de terminal, recupera el ID de registro-creado.json como en el caso anterior. Conserva los registros 7, 8 y 9.')]
        request, *body = op['request'].split('\n',1)
        verb, path = request.split(' ',1)
        code = f'curl -i -X {verb} "{url}{path}"'
        if body:
            code += " \\\n  -H 'Content-Type: application/json' \\\n  -d '"+body[0]+"'"
        if chapter in (3,4): code += f'\ncurl -i "{route}"'
        return [command(d['chapters'][chapter],code,'En DynamoDB el índice se actualiza de forma eventual; si acabas de cambiar la asociación, espera a que el índice refleje la escritura y repite la consulta.' if chapter==5 and tech=='cloud' else '')]

    for tech,target in tracks.items():
        for chapter in range(1,6):
            stages = [s for s in d['steps'][tech] if s['chapter']==chapter and s['path'].startswith('src/') and not (tech=='nest' and d.get('nestSimpleRevision') and s['path']=='src/taller.module.ts')]
            blocks = []
            if tech=='cloud' and chapter==4:
                dependency = next(s for s in d['steps']['cloud'] if s['chapter']==5 and s['name']=='Repository')
                blocks.append(file(dependency['path'],dependency['code'],'Crea este repository antes del service de traslado: lo importa para buscar el registro principal.'))
            blocks += [file(s['path'],s['code'],'Mismo archivo completo que estudias en Entrenar.') for s in stages]
            if tech=='nest':
                blocks += [file('src/taller.module.ts',modules(chapter),'Solo importa los casos cuyos archivos ya has creado.'),
                           command('Terminal 1 · reinicia después de guardar','npm run build\nnpm run start','Detén antes Nest con Ctrl+C. Usa otra terminal para las peticiones.')]
            else:
                blocks += [file('serverless.yml',yaml_file(chapter),'Configuración acumulativa con los handlers y rutas de esta fase.'),
                           command('Comprueba sintaxis y despliega','\n'.join('node --check '+s['path'] for s in stages)+'\nnpm run deploy')]
            blocks += tests(tech,chapter)
            if tech=='nest' and chapter in (3,4):
                blocks.append(command('Confirma el dato y la referencia en SQL',f'''psql -h localhost -p 5432 -U postgres -d control_databridge -W -c 'SELECT "ID", "{metric['column']}", "{c['foreignKey']}" FROM "{child['sql']}" WHERE "ID" = 7;' '''))
            expect = d['operations'][chapter-1]['result']
            if chapter < 3:
                expect = 'Usa el ID real devuelto en el alta. Antes hay tres registros, después del alta cuatro y después del borrado vuelven a quedar 7, 8 y 9.'
            target.append(step('caso-'+str(chapter),d['chapters'][chapter],
                'Monta el caso en Entrenar. Aplica los archivos completos y comprueba su resultado en tu proyecto.',
                'mi-practica/'+('nest · dos terminales' if tech=='nest' else 'serverless · terminal del Codespace'),blocks,
                expect,'trace',['curl / Invoke' if tech=='cloud' else 'curl','handler' if tech=='cloud' else 'controller','service','repository → '+('Entity' if tech=='cloud' else 'PostgreSQL')],
                {'track':tech,'index':next(i for i,s in enumerate(d['steps'][tech]) if s['chapter']==chapter)}))
        read = command('Confirma la persistencia en SQL',f'''psql -h localhost -p 5432 -U postgres -d control_databridge -W -c 'SELECT * FROM "{child['sql']}" ORDER BY "ID";' ''') if tech=='nest' else command('Lee lo guardado con PartiQL',partiql(f'SELECT * FROM "{child["table"]}_${{TALLER_EQUIPO}}" WHERE {child_key} = 7',True))
        target.append(step('guardar','Comprueba y guarda tu trabajo','Compara la respuesta con el dato guardado y sube los archivos del proyecto a tu GitHub.',
            'Desde tu práctica; conserva tus credenciales fuera de Git',[
                read,command('Revisa antes de subir','git status --short\ngit add .\ngit diff --cached --stat\ngit commit -m "Construye el taller de '+parent['entity']+' y '+child['entity']+'"\ngit push origin main','Revisa que .env y ~/.aws/credentials no aparezcan en los archivos que vas a subir.'),
                command('Retoma mañana','git pull\npwd','Arranca PostgreSQL/Nest o recupera tu Codespace, renueva las credenciales de Academy y recupera las variables con los pasos anteriores. Detener Codespaces no elimina los recursos AWS.')],
            f"El registro 7 tiene {metric['property']} = {metric['after']} y referencia al ID 2. Tu código está en tu GitHub, sin credenciales.",
            'persist',['Petición','Dato guardado','Tu GitHub','Continuar mañana']))
    # Mantener los nombres de la prueba ya realizada en el piloto.
    if c['id'] == 'CH-22':
        tracks = replace_strings(replace_strings(tracks, 'REGISTRO_PRUEBA_ID', 'OBRA_PRUEBA_ID'), 'registro-creado.json', 'obra-creada.json')
    else:
        tracks = replace_strings(tracks, 'registro-creado.json', 'respuesta-registro.json')
    result = dict(version=1,caseId=c['id'],title=c['title'],context=c,fieldGuide=d['fieldGuide'],profile='default',team='equipo01',tracks=tracks)
    from arturo_nest_sencillo import apply_preparation
    apply_preparation(result,d)
    (ROOT/'preparar'/source.name).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    return c['id'],len(nest),len(cloud)


if __name__ == '__main__':
    results = [generate(source) for source in sorted((ROOT/'entrenar/casos').glob('CH-*.json'))]
    print(f'{len(results)} contextos: '+', '.join(f'{id} ({n}/{c})' for id,n,c in results))
