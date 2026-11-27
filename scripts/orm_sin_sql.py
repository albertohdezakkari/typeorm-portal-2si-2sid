"""Especialización de la carga TypeORM validada con Arturo para los 31 contextos.

Se adaptan nombres, datos, métricas y roles con una única sustitución de tokens.
Los ejemplos del hijo proceden de su ficha real; los perfiles conservan NOMBRE.
La base PostgreSQL existente sigue usando synchronize: true.
"""
from pathlib import Path
from functools import lru_cache
import json,re
ROOT=Path(__file__).resolve().parents[1]

def substitute(text,mapping):
    keys=sorted([k for k,v in mapping.items()if k!=v],key=len,reverse=True)
    return re.sub('|'.join(map(re.escape,keys)),lambda m:mapping[m[0]],text)if keys else text

@lru_cache(None)
def template(case_id):
    if case_id=='CH-22':
        import arturo_sin_sql
        return vars(arturo_sin_sql)
    d=json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text());c=d['context'];p=c['parent'];n=c['child'];m=c['metric'];fixtures=d['fixtures']
    person,people,role1,role2,role3,gender=json.loads((ROOT/'scripts/nm-contextos.json').read_text())[case_id]
    # Las cadenas entran en literales Python/TypeScript de la plantilla validada.
    # Fallar explícitamente si un contexto nuevo requiere un escape diferente.
    for value in [*p['examples'],*[row['name']for row in fixtures]]:
        assert not any(ch in value for ch in ["'",'\\','\n']),('Nombre necesita escape',case_id,value)
    mapping={
      'CH-22':case_id,'Arturo':case_id,
      'http://localhost:3000':'http://localhost:__AULA_PORT__',
      'profesionales':people,'Profesionales':people.capitalize(),'PROFESIONALES':people.upper(),
      'profesional':person.lower(),'Profesional':person,'PROFESIONAL':person.upper(),
      'ayuntamientos':p['route'],'Ayuntamientos':p['route'].capitalize(),'AYUNTAMIENTOS':p['table'],
      'ayuntamiento':p['property'],'Ayuntamiento':p['entity'],'AYUNTAMIENTO':p['sql'],
      'obras':n['route'],'Obras':n['route'].capitalize(),'OBRAS':n['table'],
      'obra':n['property'],'Obra':n['entity'],'OBRA':n['sql'],
      'presupuestoEuros':m['property'],'PRESUPUESTO_EUROS':m['column'],'presupuesto':m['label'].lower(),
      'Ayuntamiento del Río':p['examples'][0],'Ayuntamiento del Valle':p['examples'][1],
      'Mejora de acera · nuevo':fixtures[2]['name'],'Mejora de acera':fixtures[0]['name'],'Zona de sombra':fixtures[1]['name'],
      '15000':str(m['after']),'3001':str(m['create']),'12001':str(m['minimum']),
      '3000':str(fixtures[0]['value']),'12000':str(fixtures[1]['value']),'18000':str(fixtures[2]['value']),
      'Electricista':role1,'Arquitecta':role2,'Coordinador':role3
    }
    if gender=='m':
        for a,b in [('la obra','el '+n['property']),('La obra','El '+n['property']),('las obras','los '+n['route']),('Las obras','Los '+n['route']),('tres obras','tres '+n['route']),('cuatro obras','cuatro '+n['route'])]:mapping[a]=b
    program=substitute((ROOT/'scripts/arturo_sin_sql.py').read_text(),mapping).replace('__AULA_PORT__','3000')
    env={'__file__':str(ROOT/'scripts/arturo_sin_sql.py'),'__name__':'orm_sin_sql_'+case_id}
    exec(compile(program,'orm-sin-sql-'+case_id,'exec'),env)
    if c['text']['property']!='nombre':
        for key in ['LOAD','NM_LOAD']:
            for method in ['findOneBy','findOneByOrFail','save']:
                env[key]=env[key].replace(n['route']+'.'+method+'({ nombre:',n['route']+'.'+method+'({ '+c['text']['property']+':')
    return env

def training(data):template(data['context']['id'])['training'](data)
def preparation(data,training):
    template(data['caseId'])['preparation'](data,training)
    # El cuerpo del alta conserva las propiedades y los valores exactos de su caso.
    # Solo se sustituye el ID del principal por su variable real de esta terminal.
    c=training['context'];body=json.loads(training['operations'][0]['request'].split('\n',1)[1]);key=c['parent']['input']
    old=json.dumps(body,ensure_ascii=False,separators=(',',':'))
    body[key]='__ID_REAL__';new=json.dumps(body,ensure_ascii=False,separators=(',',':')).replace('"__ID_REAL__"','$'+c['parent']['sql']+'_2_ID')
    new='-d "'+new.replace('"','\\"')+'"'
    for phase in data['tracks']['nest']:
        if phase['id']=='caso-1':
            for b in phase['blocks']:
                if b['kind']=='command':b['code']=b['code'].replace("-d '"+old+"'",new)

def nm(data,files):template(data['caseId'])['nm'](data,files)
