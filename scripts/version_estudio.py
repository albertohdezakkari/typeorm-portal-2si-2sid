"""Extiende los recorridos validados conservando el dominio de cada ficha.

Las transformaciones del piloto siguen siendo la plantilla de código. Solo se
especializan sus identificadores en una pasada. api_sin_precarga añade las APIs
de ambos extremos y retira los seeds. nm_modulo_unico aplica el patrón N:M
validado de Alejandro. Los PDF históricos se conservan.
"""
from copy import deepcopy
from functools import lru_cache
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1]
CONFIG=json.loads((ROOT/'scripts/nm-contextos.json').read_text())


def substitute(text,mapping):
    keys=sorted((k for k,v in mapping.items() if k!=v),key=len,reverse=True)
    return re.sub('|'.join(map(re.escape,keys)),lambda m:mapping[m[0]],text) if keys else text


@lru_cache(None)
def adapters(case_id):
    if case_id=='CH-22':
        import examen_base_arturo
        return vars(examen_base_arturo)
    train=json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text());c=train['context'];p=c['parent'];n=c['child'];m=c['metric']
    person,people,role1,role2,role3,gender=CONFIG[case_id]
    mapping={
        'CH-22':case_id,'Arturo':case_id,'taller-arturo':'mi-backend-'+case_id.lower(),
        'profesionales':people,'Profesionales':people.capitalize(),'PROFESIONALES':people.upper(),
        'profesional':person.lower(),'Profesional':person,'PROFESIONAL':person.upper(),
        'ayuntamientos':p['route'],'Ayuntamientos':p['route'].capitalize(),'AYUNTAMIENTOS':p['table'],
        'ayuntamiento':p['property'],'Ayuntamiento':p['entity'],'AYUNTAMIENTO':p['sql'],
        'obras':n['route'],'Obras':n['route'].capitalize(),'OBRAS':n['table'],
        'obra':n['property'],'Obra':n['entity'],'OBRA':n['sql'],
        'presupuestoEuros':m['property'],'PRESUPUESTO_EUROS':m['column'],
        'Presupuesto':m['label'],'presupuesto':m['label'].lower(),
        'Electricista':role1,'Arquitecta':role2,'Coordinador':role3,
        'Mejora de acera':train['fixtures'][0]['name'],'Zona de sombra':train['fixtures'][1]['name']}
    if gender=='m':
        mapping.update({'la obra':'el '+n['property'],'La obra':'El '+n['property'],'una obra':'un '+n['property'],'las obras':'los '+n['route'],'Las obras':'Los '+n['route']})
    seed={ '__file__':str(ROOT/'scripts/nm_sin_carga_arturo.py'),'__name__':'sin_precarga_'+case_id }
    exec(compile(substitute((ROOT/'scripts/nm_sin_carga_arturo.py').read_text(),mapping),'sin-precarga-'+case_id,'exec'),seed)
    program=substitute((ROOT/'scripts/examen_base_arturo.py').read_text(),mapping)
    program=program.replace('from nm_sin_carga_arturo import apply','apply = without_seed')
    env={'__file__':str(ROOT/'scripts/examen_base_arturo.py'),'__name__':'estudio_'+case_id,'without_seed':seed['apply']}
    exec(compile(program,'estudio-'+case_id,'exec'),env)
    env['BASE']['pilot']=False
    env['_mapping']=mapping
    return env


def training(data):
    case_id=data['context']['id'];old=deepcopy(data)
    adapters(case_id)['training'](data)
    if case_id=='CH-22':
        from api_sin_precarga import training as api_training
        from nest_cli_docente import training as cli_training
        return cli_training(api_training(data))
    data['source']['label']=case_id+' · Nest + TypeORM'
    if 'legacyNestChapters' in old:data['legacyNestChapters']=old['legacyNestChapters']
    # El índice se conserva y solo se renuevan las respuestas de archivos cambiados.
    if old.get('nestSimpleRevision')!=data.get('nestSimpleRevision'):
        positions=[];retained=[]
        for i,previous in enumerate(old['steps']['nest']):
            candidates=[(j,s)for j,s in enumerate(data['steps']['nest'])if s['chapter']==previous['chapter'] and s['name']==previous['name']]
            j,current=candidates[0] if candidates else (0,data['steps']['nest'][0]);positions.append(j)
            if previous['code']==current['code'] and previous['cues']==current['cues']:retained.append('nest:'+str(i))
        data['nestMigration']={'fromRevision':old.get('nestSimpleRevision',0),'positions':positions,'retained':retained}
    from api_sin_precarga import training as api_training
    from nest_cli_docente import training as cli_training
    return cli_training(api_training(data))


def preparation(data,train):
    adapters(data['caseId'])['preparation'](data,train)
    from api_sin_precarga import preparation as api_preparation
    from nest_cli_docente import preparation as cli_preparation
    return cli_preparation(api_preparation(data,train),train)


def nm(data,files,cloud=None):
    case_id=data['caseId'];adapters(case_id)['nm'](data,files)
    if case_id=='CH-22':
        from api_sin_precarga import nm as api_nm
        api_nm(data,files,cloud)
        from nm_modulo_unico import apply
        apply(data,files)
        from nest_cli_docente import nm as cli_nm
        cli_nm(data,files)
        return
    # Los curl nuevos no presuponen una precarga; revisar sus marcas antiguas.
    changed={s['id']for s in data['tracks']['nest']if s['id'].endswith('-curl')}|{'datos','cargar','persistencia'}
    for revision,retained in data.get('nestRetainedByRevision',{}).items():
        data['nestRetainedByRevision'][revision]=[id for id in retained if id not in changed]
    c=data.get('context') or json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text())['context'];n=c['child'];p=c['parent']
    files['src/'+n['route']+'/'+n['route']+'.service.ts']=next(s['code']for s in json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text())['steps']['nest']if s['chapter']==5 and s['name']=='Service')+'\n'
    files['README.md']='# '+c['title']+' · ampliación N:M\n\nContinúa tu backend 1:N ya preparado con el README de [la base docente](https://github.com/albertohdezakkari/examen-typeorm-27-11-26-01#readme). Conserva su configuración, las Entities y los casos anteriores.\n\nTrabaja dentro de backend. TypeORM crea las tablas con synchronize: true; no hay SQL de creación manual. Añade las dos Entities y los módulos indicados en el cuaderno; después sus Services y Controllers. Las altas N:M se prueban mediante POST, con los IDs reales devueltos por tu API, sin precarga ni fichero de IDs adicional.\n\nPara arrancar: npm run start:dev. Las llamadas curl se ejecutan en otra terminal.\n'
    from api_sin_precarga import nm as api_nm
    api_nm(data,files,cloud)
    from nm_modulo_unico import apply
    apply(data,files)
    from nest_cli_docente import nm as cli_nm
    cli_nm(data,files)


def write_runtime(case_id):
    data=json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text());c=data['context'];m=c['metric']
    runtime=substitute((ROOT/'nm/taller.js').read_text(),adapters(case_id).get('_mapping',{}))
    if case_id!='CH-22':runtime=runtime.replace("from '../peticiones.js","from '../../../peticiones.js")
    from nm_modulo_unico import runtime as common_runtime
    runtime=common_runtime(runtime,case_id)
    runtime=runtime.replace("['DATO','NOMBRE'],['DATO','"+m['column']+"']","['DATO','"+c['text']['column']+"'],['DATO','"+m['column']+"']")
    runtime=runtime.replace("['ID','PK'],['NOMBRE',''],['"+m['column']+"','']","['ID','PK'],['"+c['text']['column']+"',''],['"+m['column']+"','']")
    folder=ROOT/'nm'if case_id=='CH-22'else ROOT/f'nm/casos/{case_id}';(folder/'taller.js').write_text(runtime)
    if case_id=='CH-22':
        page=folder/'index.html';page.write_text(re.sub(r'taller.js\?v=[^"\s]+','taller.js?v=nest-cli-1',page.read_text()))
        return
    title=json.loads((folder/(case_id+'.json')).read_text())['title']
    (folder/'index.html').write_text(f'<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{case_id} · {title} · N:M</title><link rel="stylesheet" href="../../taller.css?v=altas-api-1"><link rel="stylesheet" href="../../../lectura.css?v=altas-api-1"></head><body><main id="nm-root"><p role="status">Preparando tu ampliación N:M…</p></main><script type="module" src="taller.js?v=altas-api-1"></script></body></html>\n')
    (folder/'README.md').write_text('# '+case_id+' · '+title+'\n\nEn el [cuaderno de clase](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/), elige tu correo. Prepara el proyecto base siguiendo detenidamente su README y continúa en Entrenar con mis fichas.\n\nPrimero completa la relación 1:N de '+c['title']+'. Después amplía el mismo backend con '+CONFIG[case_id][0]+' y Asignacion. En Nest se crean las dos Entities, sus módulos, Services y Controllers; las altas se hacen mediante la API, con sus IDs reales, sin otra precarga. Serverless conserva sus tablas, Table + Entity y las operaciones desde el modelo.\n\nLee y copia los archivos completos en orden. Los menús permanecen abiertos, el selector de tecnología está a la derecha y puedes alternar Nest + TypeORM / Serverless + Toolbox. Las comprobaciones se ejecutan en tu terminal. El cuaderno guarda el avance en este navegador.\n')
    page=folder/'index.html';html=page.read_text().replace('src="taller.js?v=altas-api-1"','src="taller.js?v=nest-cli-1"')
    page.write_text(html)
    guide=folder/'README.md';guide.write_text(guide.read_text().replace('sus módulos, Services y Controllers','un único AsignacionesModule, un AsignacionesService con los tres repositorios y un AsignacionesController para toda la N:M'))


def main():
    for case_id in CONFIG:
        path=ROOT/f'entrenar/casos/{case_id}.json';train=json.loads(path.read_text());training(train);path.write_text(json.dumps(train,ensure_ascii=False,indent=2)+'\n')
        path=ROOT/f'preparar/{case_id}.json';prep=json.loads(path.read_text());preparation(prep,train);path.write_text(json.dumps(prep,ensure_ascii=False,indent=2)+'\n')
        folder=ROOT/'nm' if case_id=='CH-22' else ROOT/f'nm/casos/{case_id}';path=folder/(case_id+'.json');data=json.loads(path.read_text());dest=folder/'codigo/nest'
        files={str(p.relative_to(dest)):p.read_text()for p in dest.rglob('*')if p.is_file()};cloud_dir=folder/'codigo/cloud';cloud={str(p.relative_to(cloud_dir)):p.read_text()for p in cloud_dir.rglob('*')if p.is_file()};nm(data,files,cloud)
        from nm_modulo_unico import obsolete_files
        for stale in ['src/taller.module.ts','src/datos/cargar-datos-nm.ts','src/datos/cargar-datos.ts']+obsolete_files(case_id):
            target=dest/stale
            if stale not in files and target.exists():target.unlink()
        for name,code in files.items():
            target=dest/name;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(code)
        for stale in cloud_dir.rglob('*cargar-datos*'):
            if stale.is_file():stale.unlink()
        for name,code in cloud.items():
            target=cloud_dir/name;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(code)
        path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
        write_runtime(case_id)
        print(case_id,train['context']['title'],len(train['steps']['nest']),len(data['tracks']['nest']))

if __name__=='__main__':main()
