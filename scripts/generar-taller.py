"""Compila los contextos del taller desde las fichas, sin copiar el censo.

El selector utiliza portal-data.js, que ya existe. Los archivos nuevos contienen
solo casos didácticos, ejemplos ficticios y huellas de los PDF; nunca nombres,
correos ni nombres de archivo personalizados del alumnado.
"""
from pathlib import Path
import argparse, copy, hashlib, json, re
from pypdf import PdfReader
from campos_modelo import apply as apply_field_guide

ROOT = Path(__file__).resolve().parents[1]

def physical(value):
    return re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', value).upper()

def kebab(value):
    return re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', value).lower()

def replace_all(value, mapping):
    pattern = re.compile('|'.join(re.escape(k) for k in sorted(mapping, key=len, reverse=True)))
    return pattern.sub(lambda m: mapping[m.group()], value)

def compile_case(case, classic, base, sources, pdf_folder):
    cid = case['id']; p = case['parent']; c = case['child']
    P, N = p['entity'], c['entity']; pr, cr = classic['parentRoute'], classic['childRoute']
    relation = classic['relation']; text = classic['textField']; metric = c['metric']
    pk, ck = physical(P)+'_ID', physical(N)+'_ID'
    pid, nid = c['parentInput'], N[0].lower()+N[1:]+'Id'
    parent = dict(entity=P, sql=physical(P), table=p['table'].upper(), route=pr,
                  property=relation, input=pid, variable='TABLA_'+p['table'].upper(),
                  model='MODELO_'+physical(P), file=f'src/{pr}/entities/{kebab(P)}.entity.ts',
                  examples=p['examples'])
    child = dict(entity=N, sql=physical(N), table=c['table'].upper(), route=cr,
                 property=N[0].lower()+N[1:], input=nid, inverse=c['table'],
                 variable='TABLA_'+c['table'].upper(), model='MODELO_'+physical(N),
                 file=f'src/{cr}/entities/{kebab(N)}.entity.ts')
    vals = [row[metric] for row in c['examples']]
    names = [row.get(text, row.get('nombre')) for row in c['examples']]
    assert all(names), cid
    m = dict(property=metric, column=physical(metric), label=c['metricLabel'],
             unit=c['unit'], initial=vals[0], other=vals[1], after=vals[2],
             minimum=vals[1]+1, create=vals[0]+1, unrelated=vals[2]+max(vals[0],1))
    ctx = dict(id=cid, title=case['title'], parent=parent, child=child,
               text=dict(property=text, column=physical(text)), metric=m,
               foreignKey=classic['foreignKey'], index='Por'+P,
               modelFile=f'src/models/{kebab(P)}-{kebab(N)}.model.mjs', createName='Registro de prueba')
    mapping = {
        'Huerto del Río':p['examples'][0], 'Huerto del Parque':p['examples'][1],
        'Parcela de prueba':'Registro de prueba', 'Parcela A':names[0], 'Parcela B':names[1], 'Parcela C':names[2],
        'TablaHuertos':'Tabla'+pr[0].upper()+pr[1:], 'TablaParcelas':'Tabla'+cr[0].upper()+cr[1:],
        'HUERTO_ID':pk, 'PARCELA_ID':ck, 'ID_HUERTO':classic['foreignKey'],
        'MODELO_HUERTO':parent['model'], 'MODELO_PARCELA':child['model'],
        'HUERTOS':parent['table'], 'PARCELAS':child['table'], 'HUERTO':parent['sql'], 'PARCELA':child['sql'],
        'huertoId':pid, 'parcelaId':nid, 'huerto-parcela':f'{kebab(P)}-{kebab(N)}',
        'modificar-superficie':'modificar-'+kebab(metric),
        'SUPERFICIE_M2':m['column'], 'superficieM2':metric, 'Superficie':metric[0].upper()+metric[1:],
        'Huertos':pr[0].upper()+pr[1:], 'Parcelas':cr[0].upper()+cr[1:],
        'Huerto':P, 'Parcela':N, 'huertos':pr, 'parcelas':cr,
        'huerto':relation, 'parcela':child['property'],
        'superficie':m['label'].lower(), 'm²':m['unit']
    }
    prose = {
        'Cada parcela':'Cada registro asociado', 'cada parcela':'cada registro asociado',
        'Una parcela':'Un registro asociado', 'una parcela':'un registro asociado',
        'La parcela':'El registro asociado', 'la parcela':'el registro asociado',
        'Las parcelas':'Los registros asociados', 'las parcelas':'los registros asociados',
        'al huerto':'al registro principal', 'del huerto':'del registro principal',
        'el huerto':'el registro principal', 'un huerto':'un registro principal'
    }
    def domain(s): return replace_all(s, mapping)
    def note(s):
        s = domain(replace_all(s, prose)).replace('los registros asociados asociadas', 'los registros asociados')
        nums={65:m['after'],60:m['minimum'],20:m['initial'],45:m['other'],80:m['unrelated']}
        return re.sub(r'\b(?:65|60|20|45|80)\b', lambda a:str(nums[int(a.group())]), s)
    d=copy.deepcopy(base)
    scene_roles={'nest-huerto':'nest-parent','nest-parcela':'nest-child'}
    for tech, stages in d['steps'].items():
        for original, step in zip(base['steps'][tech], stages):
            step['name']=domain(original['name']);step['path']=domain(original['path'])
            step['code']=domain(original['code']);step['scene']=scene_roles.get(original['scene'],original['scene'])
            if text!='nombre' and step['path'].startswith('src/') and '/entities/' not in step['path'] and '/models/' not in step['path']:
                step['code']=re.sub(r'\bnombre\b',text,step['code'])
            for cue, old in zip(step['cues'],original['cues']):
                cue['text']=domain(old['text']);cue['title']=note(old['title']);cue['note']=note(old['note'])
                if text!='nombre' and step['path'].startswith('src/') and '/entities/' not in step['path'] and '/models/' not in step['path']:
                    cue['text']=re.sub(r'\bnombre\b',text,cue['text'])
    # La muestra CH-02 conserva exactamente sus datos y código aprobados.
    if cid=='CH-02':
        d=copy.deepcopy(base)
        for stages in d['steps'].values():
            for s in stages:s['scene']=scene_roles.get(s['scene'],s['scene'])
        m.update(minimum=60,create=32,unrelated=80)
        ctx['createName']='Parcela de prueba';names=['Parcela A','Parcela B','Parcela C']
    else:
        resource_root=sources/cid
        if resource_root.exists():
            for stages in d['steps'].values():
                for step in stages:
                    path=resource_root/step['path']
                    if path.is_file():step['code']=path.read_text().strip()
                    elif step['path']=='serverless.yml · resources':step['code']=(resource_root/'serverless.yml').read_text().strip()
        else:
            # Solo el ejemplo docente CH-13 no forma parte de los 30 PDF personales.
            assert cid=='CH-13'
            for stages in d['steps'].values():
                for step in stages:
                    step['exact']=False
                    if step['path']==child['file']:
                        step['code']=step['code'].replace("name: 'NOMBRE'",f"name: '{physical(text)}'").replace('nombre!:',text+'!:')
                    if step['path']==ctx['modelFile']:
                        head,tail=step['code'].split('export const '+child['model'],1)
                        tail=tail.replace("nombre: string().savedAs('NOMBRE')",f"{text}: string().savedAs('{physical(text)}')")
                        step['code']=head+'export const '+child['model']+tail
        if cid=='CH-13':
            for stages in d['steps'].values():
                for step in stages:
                    if step['path']==child['file']:
                        for cue in step['cues']:cue['text']=cue['text'].replace("name: 'NOMBRE'",f"name: '{physical(text)}'")
    if cid!='CH-02':
        ops=d['operations']
        for i, op in enumerate(ops):
            for key,val in list(op.items()):
                if isinstance(val,str):op[key]=domain(val)
        ops[0]['request']='POST /'+cr+'\n'+json.dumps({text:ctx['createName'],metric:m['create'],pid:2},ensure_ascii=False,separators=(',',':'))
        ops[0]['result']='201 · Registro 10 creado → GET /'+cr+' → 200 · aparecen 4 registros'
        ops[1]['request']='DELETE /'+cr+'/10';ops[1]['result']='204 · Registro 10 eliminado → GET /'+cr+' → 200 · quedan 7, 8 y 9'
        ops[2]['request']='PATCH /'+cr+'/7\n'+json.dumps({metric:m['after']},separators=(',',':'))
        ops[2]['result']=f'200 · Registro 7 · {metric} = {m["after"]} {m["unit"]} · {pid} = 1'
        ops[3]['request']='PATCH /'+cr+'/7/'+relation+'\n'+json.dumps({pid:2},separators=(',',':'))
        ops[3]['result']=f'200 · Registro 7 · {metric} = {m["after"]} {m["unit"]} · {pid} pasa de 1 a 2'
        ops[4]['request']=f'GET /{pr}/2/{cr}?minimo={m["minimum"]}'
        ops[4]['result']=f'200 · {p["examples"][1]} + registro 7 ({m["after"]} {m["unit"]}). Excluye el 8 ({m["other"]} {m["unit"]}) y el 9 (pertenece al ID 1).'
        for stages in d['steps'].values():
            for step in stages:
                if step['scene']=='result':
                    op=ops[step['chapter']-1];step['code']=op['request']+'\n\n'+op['result']
                    if step['chapter']==1:step['code']+='\n\nID 10: ejemplo visual. Utiliza el ID devuelto por tu POST.'
                    step['cues']=[dict(text=op['result'],title='Comprobar el resultado',note=op['result'])]
        d['chapters']=['Preparar el modelo','Añadir y listar','Eliminar el registro de prueba','Modificar '+m['label'].lower(),'Cambiar la asociación','Consultar la relación']
    d['context']=ctx
    d['fixtures']=[dict(id=7,name=names[0],value=m['initial'],parent=1),dict(id=8,name=names[1],value=m['other'],parent=2),dict(id=9,name=names[2],value=m['unrelated'],parent=1)]
    pdfs=list(pdf_folder.glob('*'+cid+'.pdf'))
    if cid!='CH-13':
        assert len(pdfs)==1,(cid,'PDF ausente o duplicado')
        pdf=pdfs[0];reader=PdfReader(pdf);assert len(reader.pages)==4
        page4=reader.pages[3].extract_text()
        if cid!='CH-02':
            assert f'minimo={m["minimum"]}' in page4,(cid,'mínimo del PDF')
            assert str(m['after']) in page4 and metric in page4,(cid,'métrica del PDF')
        d['source']=dict(kind='pdf',label='Ficha '+cid,sha256=hashlib.sha256(pdf.read_bytes()).hexdigest(),pages=4)
    else:d['source']=dict(kind='teacher',label='Ejemplo docente · '+case['title'])
    d['version']=5
    apply_field_guide(d)
    for stages in d['steps'].values():
        assert len(stages)==26
        for step in stages:
            for cue in step['cues']:
                assert cue['text'] in step['code'],(cid,step['name'],cue['text'])
    return d

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--fuentes',type=Path,required=True);parser.add_argument('--pdfs',type=Path,required=True)
    args=parser.parse_args()
    raw=(ROOT/'portal-data.js').read_text();portal=json.loads(raw.split('=',1)[1].strip().rstrip(';'))
    classic=json.loads((ROOT/'crud-contextos.json').read_text())['cases']
    base=json.loads((ROOT/'scripts/plantillas/ch-02.json').read_text())
    assigned={a['caseId'] for a in portal['assignments'] if not a.get('simulation')};assert len(assigned)==30
    wanted=assigned|{portal['teacherCase']['id']};out=ROOT/'entrenar/casos';out.mkdir(parents=True,exist_ok=True)
    proofs=[]
    for case in sorted(portal['cases'],key=lambda c:c['id']):
        if case['id'] not in wanted:continue
        d=compile_case(case,classic[case['id']],base,args.fuentes,args.pdfs)
        path=out/(case['id']+'.json');path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
        assert '@svalero.com' not in path.read_text()
        proofs.append(dict(case=case['id'],source=d['source'],steps={k:len(v) for k,v in d['steps'].items()},sha256=hashlib.sha256(path.read_bytes()).hexdigest()))
    assert len(proofs)==31
    (ROOT/'entrenar/verificacion.json').write_text(json.dumps(proofs,ensure_ascii=False,indent=2)+'\n')
    print('30 contextos cotejados con sus PDF y 1 ejemplo docente; 52 pasos por contexto. Sin nuevo censo.')

if __name__=='__main__':main()
