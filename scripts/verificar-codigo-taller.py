"""Verifica los ejemplos completos, con las dependencias locales indicadas.

No conecta a AWS ni PostgreSQL. TypeScript compila cada contexto; Toolbox
ejecuta las seis operaciones contra un cliente simulado y comprueba el mapeo.
Los directorios temporales se eliminan al terminar.
"""
from pathlib import Path
import argparse, concurrent.futures, json, subprocess, tempfile

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--nest-deps', type=Path, required=True)
parser.add_argument('--toolbox-deps', type=Path, required=True)
args = parser.parse_args()
nest_deps, toolbox_deps = args.nest_deps.resolve(), args.toolbox_deps.resolve()

CLOUD = r'''
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { calls } from './src/datos/dynamo.mjs';
const d=JSON.parse(await readFile('./data.json','utf8')),c=d.context,p=c.parent,n=c.child,m=c.metric;
process.env[p.variable]=p.table;process.env[n.variable]=n.table;
const stages=d.steps.cloud;
const load=chapter=>import('./'+stages.find(s=>s.chapter===chapter&&s.name==='Handler').path);
const create=await load(1),remove=await load(2),update=await load(3),move=await load(4),read=await load(5);
let response=await create.crearHandler({body:JSON.stringify({[c.text.property]:c.createName,[m.property]:m.create,[p.input]:2})});
assert.equal(response.statusCode,201);
const item=JSON.parse(response.body);assert.equal(typeof item[n.input],'number');
assert.equal(calls.at(-1).Item[n.sql+'_ID'],item[n.input]);
assert.equal(calls.at(-1).Item[m.column],m.create);
assert.equal(calls.at(-1).Item[p.sql+'_ID'],2);
assert.match(calls.at(-1).ConditionExpression,/attribute_not_exists/);
assert.equal(calls.at(-1).Item._et,undefined);assert.equal(calls.at(-1).Item._ct,undefined);
response=await create.listarHandler();assert.equal(response.statusCode,200);
assert.equal(JSON.parse(response.body)[0][n.input],7);assert.equal(calls.at(-1).ConsistentRead,true);
response=await remove.handler({pathParameters:{[n.input]:'10'}});
assert.equal(response.statusCode,204);assert.deepEqual(calls.at(-1).Key,{[n.sql+'_ID']:10});
response=await update.handler({pathParameters:{[n.input]:'7'},body:JSON.stringify({[m.property]:m.after})});
assert.equal(response.statusCode,200);assert.equal(JSON.parse(response.body)[m.property],m.after);
assert.equal(calls.at(-1).ReturnValues,'ALL_NEW');assert.match(calls.at(-1).ConditionExpression,/attribute_exists/);
response=await move.handler({pathParameters:{[n.input]:'7'},body:JSON.stringify({[p.input]:2})});
assert.equal(response.statusCode,200);assert.equal(JSON.parse(response.body)[p.input],2);
response=await read.handler({pathParameters:{[p.input]:'2'},queryStringParameters:{minimo:String(m.minimum)}});
assert.equal(response.statusCode,200);assert.equal(calls.at(-2).ConsistentRead,true);
assert.equal(calls.at(-1).IndexName,c.index);assert.ok(calls.at(-1).FilterExpression);
assert.equal(calls.at(-1).ConsistentRead,undefined);
assert.equal(JSON.parse(response.body)[p.property][p.input],2);
assert.ok(calls.every(call=>[p.table,n.table].includes(call.TableName)));
'''

METADATA = r'''
require('reflect-metadata');
const assert=require('node:assert/strict'),{DataSource}=require('typeorm'),{getRepositoryToken}=require('@nestjs/typeorm');
const d=require('./data.json'),c=d.context,p=c.parent,n=c.child;
const load=file=>require('./build/'+file.slice(4).replace(/\.ts$/,'.js'));
const Parent=load(p.file)[p.entity],Child=load(n.file)[n.entity];
const {TallerModule}=require('./build/taller.module.js');
(async()=>{
const ds=new DataSource({type:'postgres',entities:[Parent,Child]});await ds.buildMetadatas();
const a=ds.getMetadata(Parent),b=ds.getMetadata(Child);
assert.equal(a.tableName,p.sql);assert.equal(b.tableName,n.sql);
assert.ok(a.primaryColumns[0].isGenerated&&b.primaryColumns[0].isGenerated);
assert.equal(b.foreignKeys[0].columns[0].databaseName,c.foreignKey);
assert.equal(b.foreignKeys[0].referencedEntityMetadata.tableName,p.sql);
assert.equal(a.relations[0].relationType,'one-to-many');assert.equal(b.relations[0].relationType,'many-to-one');
const tokens=Reflect.getMetadata('imports',TallerModule).flatMap(x=>x.providers||[]).map(x=>x.provide);
assert.ok(tokens.includes(getRepositoryToken(Parent))&&tokens.includes(getRepositoryToken(Child)));
})().catch(e=>{console.error(e);process.exitCode=1});
'''

def run(command, cwd):
    result = subprocess.run(command, cwd=cwd, text=True, capture_output=True)
    if result.returncode:
        raise AssertionError(f'{cwd.name}: {result.stdout}{result.stderr}')

def verify(path):
    data = json.loads(path.read_text()); ctx=data['context']; p,n,m=ctx['parent'],ctx['child'],ctx['metric']
    for steps in data['steps'].values():
        assert len(steps)==26
        for step in steps:
            assert all(cue['text'] in step['code'] for cue in step['cues'])
    with tempfile.TemporaryDirectory(prefix='taller-'+ctx['id']+'-') as temporary:
        root=Path(temporary)
        for tech, deps in [('nest',nest_deps),('cloud',toolbox_deps)]:
            target=root/tech;target.mkdir();(target/'node_modules').symlink_to(deps,target_is_directory=True)
            (target/'data.json').write_text(json.dumps(data))
            files={}
            for step in data['steps'][tech]:
                if step['path'].startswith('src/'):
                    assert files.setdefault(step['path'],step['code'])==step['code'],(ctx['id'],step['path'],'duplicado distinto')
            for relative, code in files.items():
                file=target/relative;file.parent.mkdir(parents=True,exist_ok=True);file.write_text(code+'\n')
            if tech=='nest':
                config=dict(compilerOptions=dict(target='ES2022',module='commonjs',experimentalDecorators=True,emitDecoratorMetadata=True,strict=True,skipLibCheck=True,outDir='build'),include=['src/**/*.ts'])
                (target/'tsconfig.json').write_text(json.dumps(config))
                run([str(nest_deps/'.bin/tsc'),'--project','tsconfig.json'],target)
                (target/'comprobar.cjs').write_text(METADATA);run(['node','comprobar.cjs'],target)
            else:
                physical={n['sql']+'_ID':7,p['sql']+'_ID':2,ctx['text']['column']:data['fixtures'][0]['name'],m['column']:m['after']}
                response=dict(Item={p['sql']+'_ID':2,'NOMBRE':p['examples'][1]},Items=[physical],Attributes=physical)
                stub='export const calls=[];export const db={send:async command=>{calls.push(command.input);return '+json.dumps(response)+'}};'
                (target/'src/datos').mkdir(exist_ok=True);(target/'src/datos/dynamo.mjs').write_text(stub)
                (target/'comprobar.mjs').write_text(CLOUD);run(['node','comprobar.mjs'],target)
    return ctx['id']

paths=sorted((ROOT/'entrenar/casos').glob('CH-*.json'))
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    results=list(pool.map(verify,paths))
print(f'{len(results)} contextos: TypeScript estricto, metadatos TypeORM y seis operaciones Toolbox desde handler comprobados. Sin servicios remotos.')
