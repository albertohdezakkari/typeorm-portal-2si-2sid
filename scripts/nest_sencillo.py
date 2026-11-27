"""Especializa el patrón sencillo validado sin alterar el dominio de cada ficha.

La plantilla docente de Arturo conserva su implementación y su historial. Esta
capa adapta identificadores por contexto en una sola pasada, sin sustituciones
en cascada. La preparación 1:N existente sigue siendo la fuente de las Entities.
"""
from pathlib import Path
import json,re
from functools import lru_cache
ROOT=Path(__file__).resolve().parents[1]

def replace(text,mapping):
    keys=sorted([k for k,v in mapping.items()if k!=v],key=len,reverse=True)
    return re.sub('|'.join(map(re.escape,keys)),lambda m:mapping[m[0]],text)if keys else text

def strings(value,mapping):
    if isinstance(value,str):return replace(value,mapping)
    if isinstance(value,list):return [strings(v,mapping)for v in value]
    if isinstance(value,tuple):return tuple(strings(v,mapping)for v in value)
    if isinstance(value,dict):return {k:strings(v,mapping)for k,v in value.items()}
    return value

@lru_cache(None)
def template(case_id):
    if case_id=='CH-22':
        import arturo_nest_sencillo
        return vars(arturo_nest_sencillo)
    d=json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text());c=d['context'];p=c['parent'];n=c['child'];m=c['metric']
    person,people,role1,role2,role3,gender=json.loads((ROOT/'scripts/nm-contextos.json').read_text())[case_id]
    slug=re.sub(r'([a-z0-9])([A-Z])',r'\1-\2',m['property']).lower()
    mapping={'CH-22':case_id,'Arturo · versión sencilla':'Versión sencilla · '+case_id,
      'profesionales':people,'Profesionales':people.capitalize(),'PROFESIONALES':people.upper(),
      'profesional':person.lower(),'Profesional':person,'PROFESIONAL':person.upper(),
      'ayuntamientos':p['route'],'Ayuntamientos':p['route'].capitalize(),'AYUNTAMIENTOS':p['table'],
      'ayuntamiento':p['property'],'Ayuntamiento':p['entity'],'AYUNTAMIENTO':p['sql'],
      'obras':n['route'],'Obras':n['route'].capitalize(),'OBRAS':n['table'],
      'obra':n['property'],'Obra':n['entity'],'OBRA':n['sql'],
      'presupuesto-euros':slug,'presupuestoEuros':m['property'],'Presupuesto':m['property'][0].upper()+m['property'][1:],'PRESUPUESTO_EUROS':m['column'],
      'presupuesto':m['label'].lower()}
    if gender=='m':
        for a,b in [('una obra','un '+n['property']),('la obra','el '+n['property']),('La obra','El '+n['property']),('esa obra','ese '+n['property']),('otra obra','otro '+n['property']),('las obras','los '+n['route']),('Las obras','Los '+n['route'])]:mapping[a]=b
    if p['entity']in ['Editorial','Agencia','Panaderia','Cooperativa','Empresa','Tienda','Estacion','Escuela','Urbanizacion','Granja','Emisora','Cafeteria']:
        for a,b in [('un ayuntamiento','una '+p['property']),('el ayuntamiento','la '+p['property']),('El ayuntamiento','La '+p['property']),('del ayuntamiento','de la '+p['property'])]:mapping[a]=b
    program=replace((ROOT/'scripts/arturo_nest_sencillo.py').read_text(),mapping)
    env={'__file__':str(ROOT/'scripts/arturo_nest_sencillo.py'),'__name__':'nest_sencillo_'+case_id}
    exec(compile(program,'nest-sencillo-'+case_id,'exec'),env)
    if c['text']['property']!='nombre':
        # Solo el campo textual del hijo cambia; los perfiles N:M conservan NOMBRE.
        for name in ['SERVICE_HEADER','SERVICE_METHODS','CONTROLLER_METHODS','SERVICE_CUES','CONTROLLER_CUES']:
            env[name]=strings(env[name],{'nombre':c['text']['property'],'NOMBRE':c['text']['column']})
    return env

def apply_training(data):
    template(data['context']['id'])['apply_training'](data)
    c=data['context']
    if c['text']['property']!='nombre':
        for key in ['fields','args']:data['operations'][0][key]=data['operations'][0][key].replace('nombre',c['text']['property'])
    from orm_sin_sql import training
    training(data)
    return data
def apply_preparation(data,training):
    template(training['context']['id'])['apply_preparation'](data,training)
    from orm_sin_sql import preparation
    preparation(data,training)
    return data
def module_code(context,chapter):return template(context['id'])['module_code'](chapter)
def apply_nm(data,files):
    template(data['caseId'])['apply_nm'](data,files)
    from orm_sin_sql import nm
    nm(data,files)
    if data['caseId']!='CH-22':
        # Los demás casos pasan directamente del recorrido original a esta versión.
        data['nestPreviousIds'].pop('1',None);data['nestRetainedByRevision'].pop('1',None)


def main():
    import runpy
    for path in sorted((ROOT/'entrenar/casos').glob('CH-*.json')):
        data=json.loads(path.read_text());apply_training(data)
        path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    runpy.run_path(str(ROOT/'scripts/generar-preparacion.py'),run_name='__main__')
    runpy.run_path(str(ROOT/'scripts/generar-nm.py'),run_name='__main__')
    runpy.run_path(str(ROOT/'scripts/generar-nm-alumnado.py'),run_name='__main__')

if __name__=='__main__':main()
