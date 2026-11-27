"""Especializa el patrón validado de Alejandro para cada caso del cuaderno."""
from functools import lru_cache
from pathlib import Path
import json,re

ROOT=Path(__file__).resolve().parents[1]
CONFIG=json.loads((ROOT/'scripts/nm-contextos.json').read_text())
CACHE='nm-unico-todos-1'

@lru_cache(None)
def adapter(case_id):
    c=json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text())['context']
    p,n=c['parent'],c['child'];person,people,*rest=CONFIG[case_id]
    mapping={'CH-31':case_id,'Alejandro':case_id,
             'Revisores':people.capitalize(),'revisores':people,'Revisor':person,'revisor':person.lower(),
             'Documentos':n['route'].capitalize(),'documentos':n['route'],'Documento':n['entity'],'documento':n['property'],
             'Archivos':p['route'].capitalize(),'archivos':p['route'],'Archivo':p['entity'],'archivo':p['property']}
    if rest[-1]=='f':
        for start,end in [('el documento','la '),('ese documento','esa '),('el mismo documento','la misma '),('otro documento','otra ')]:
            mapping[start]=end+n['property']
    keys=sorted((k for k,v in mapping.items()if k!=v),key=len,reverse=True)
    source=(ROOT/'scripts/alejandro_nm_unico.py').read_text()
    if keys:source=re.sub('|'.join(map(re.escape,keys)),lambda m:mapping[m[0]],source)
    env={'__name__':'modulo_unico_'+case_id}
    exec(compile(source,'modulo-unico-'+case_id,'exec'),env)
    return env

def apply(data,files):
    adapter(data['caseId'])['apply'](data,files)

def runtime(code,case_id):
    # El runtime raíz pasa a ser la plantilla común. La migración se añade una vez.
    if 'const modulePositionIsOld='not in code:
        code=adapter(case_id)['runtime'](code)
    return code.replace('?v=nm-unico-alejandro-1','?v='+CACHE).replace('.json?v=altas-api-1','.json?v='+CACHE)

def obsolete_files(case_id):
    people=CONFIG[case_id][1]
    return [f'src/{people}/{people}.{kind}.ts'for kind in ['module','service','controller']]
