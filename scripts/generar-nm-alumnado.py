"""Extiende el recorrido validado de Arturo usando la base 1:N real de cada caso.

El generador original y el visor son las plantillas pedagógicas validadas. Se
especializan sus identificadores de dominio en una sola pasada (sin reemplazos
en cascada). La base NO se traduce: baseline() lee preparar/CH-xx.json. Arturo
permanece idéntico, incluidas sus claves de progreso y las URL anteriores.
Ejecutar con Python 3; --pdf requiere ReportLab y los PNG de los SVG generados.
"""
from pathlib import Path
import argparse, contextlib, io, json, re, shutil

ROOT = Path(__file__).resolve().parents[1]
NM = ROOT / 'nm'
CONFIG = json.loads((ROOT/'scripts/nm-contextos.json').read_text())
TEMPLATE = (ROOT/'scripts/generar-nm.py').read_text()
RUNTIME = (NM/'taller.js').read_text()
SVG = (NM/'esquema-logico.svg').read_text()
PDF = (ROOT/'scripts/fichas-nm.py').read_text()
parser = argparse.ArgumentParser()
parser.add_argument('--pdf', action='store_true')
args = parser.parse_args()

def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)

def substitute(text, replacements):
    keys=sorted((key for key,value in replacements.items() if key != value), key=len, reverse=True)
    return re.sub('|'.join(re.escape(key) for key in keys), lambda match: replacements[match[0]], text)

manifest={}
for case_id, config in CONFIG.items():
    source=json.loads((ROOT/f'entrenar/casos/{case_id}.json').read_text())
    ctx=source['context']; p=ctx['parent']; n=ctx['child']; m=ctx['metric']
    person, people, role1, role2, role3, gender=config
    title=f"{n['route'].capitalize()} y {people}"
    folder=NM/'casos'/case_id
    metadata=dict(caseId=case_id,title=title,baselineTitle=ctx['title'],
                  person=person,people=people,roles=[role1,role2,role3],context=ctx,
                  url='nm/' if case_id=='CH-22' else f'nm/casos/{case_id}/',
                  pdf='nm/fichas-nm-ch22.pdf' if case_id=='CH-22' else f'nm/casos/{case_id}/fichas-nm.pdf')
    manifest[case_id]=metadata
    if case_id=='CH-22':
        if args.pdf:
            target=ROOT.parent/'output/pdf/nm-alumnado/CH-22-nm.pdf'
            target.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(NM/'fichas-nm-ch22.pdf',target)
        continue
    # Frases completas primero: respetan género sin alterar los identificadores.
    replacements={
        'CH-22':case_id,'ch22':case_id.lower().replace('-',''),
        'profesionales':people,'Profesionales':people.capitalize(),'PROFESIONALES':people.upper(),
        'Profesional':person,'PROFESIONAL':person.upper(),'profesional':person.lower(),
        'Ayuntamientos':p['route'].capitalize(),'AYUNTAMIENTOS':p['table'],'ayuntamientos':p['route'],
        'AYUNTAMIENTO':p['sql'],'Ayuntamiento':p['entity'],'ayuntamiento':p['property'],
        'Obras':n['route'].capitalize(),'OBRAS':n['table'],'obras':n['route'],
        'OBRA':n['sql'],'Obra':n['entity'],'obra':n['property'],
        'PRESUPUESTO_EUROS':m['column'],'presupuestoEuros':m['property'],
        'presupuesto 15000':f"{m['label'].lower()} {m['after']}",
        'Mejora de acera':source['fixtures'][0]['name'],
        'Electricista':role1,'Arquitecta':role2,'Coordinador':role3,
        'Arturo':f'tu caso {case_id}',
    }
    if gender=='m':
        for a,b in [('una obra','un '+n['property']),('la obra','el '+n['property']),('La obra','El '+n['property']),('esa obra','ese '+n['property']),('otra obra','otro '+n['property']),('la otra obra','el otro '+n['property']),('las obras','los '+n['route']),('Las obras','Los '+n['route']),('varias obras','varios '+n['route']),('dos obras','dos '+n['route'])]:
            replacements[a]=b
    translated=lambda text:substitute(text,replacements)
    # Dirigir todos los resultados a su contexto, manteniendo la plantilla validada.
    program=translated(TEMPLATE).replace("OUT=ROOT/'nm'",f"OUT=ROOT/'nm/casos/{case_id}'")
    # La imagen del esquema se genera desde el SVG validado, con las etiquetas propias.
    program=re.sub(r"^logical=ROOT.parent/.*?^shutil.copyfile\(logical,OUT/'esquema-logico.svg'\)\n", "", program, flags=re.M|re.S)
    env={'__file__':str(ROOT/'scripts/generar-nm.py'),'__name__':'__nm_generator__'}
    with contextlib.redirect_stdout(io.StringIO()):
        exec(compile(program,'nm-template-'+case_id,'exec'),env)
    # Conservar la traza histórica usada por los PDF anteriores sin dejar clases
    # Repository antiguas dentro del proyecto que copia el alumno.
    archived={('nest/'+path):text for path,text in env['casefiles']['nest'][1]}
    write(ROOT/f'scripts/plantillas/nm-impreso/{case_id}.json',json.dumps(archived,ensure_ascii=False,indent=2)+'\n')
    data=env['D'];data['context']=ctx;data['nmContext']=metadata
    # Estado final del recorrido 1:N, sin asumir los valores de Arturo.
    data['baseline']={'ids':[7,8,9],'first':{m['property']:m['after'],p['input']:2}}
    final_note=f"Se conservan los registros 7, 8 y 9 de {n['entity']}. El registro 7 mantiene {m['column']} = {m['after']} y {p['sql']}_ID = 2, como al terminar el 1:N."
    for tech,steps in data['tracks'].items():
        resume=next(s for s in steps if s['id']=='retomar')
        if tech=='cloud':resume['expect']='La API responde con HTTP 200. '+final_note
    # Referencia 1:N completa: usar exactamente las filas del contexto original.
    initial=source['fixtures'][0]
    # Nest carga y consulta los ejemplos mediante Entities; no genera archivos SQL.
    cloud=env['CLOUD']['cargar-datos-1n.sh']
    cloud=cloud.replace(f"'{m['column']}':{m['initial']}",f"'{m['column']}':{m['after']}")
    cloud=cloud.replace(f"'{n['sql']}_ID':7,'{ctx['text']['column']}':'{initial['name']}','{m['column']}':{m['after']},'{p['sql']}_ID':1",f"'{n['sql']}_ID':7,'{ctx['text']['column']}':'{initial['name']}','{m['column']}':{m['after']},'{p['sql']}_ID':2")
    write(folder/'codigo/cloud/cargar-datos-1n.sh',cloud)
    write(folder/(case_id+'.json'),json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    # El título de la ficha docente CH-13 usa PELICULA, no NOMBRE.
    runtime=translated(RUNTIME).replace('fichas-nm-'+case_id.lower().replace('-','')+'.pdf','fichas-nm.pdf')
    runtime=runtime.replace('?v=arturo-orm-1','?v=orm-todos-1')
    runtime=runtime.replace('/tree/main/nm/codigo/','/tree/main/nm/casos/'+case_id+'/codigo/')
    runtime=runtime.replace("['DATO','NOMBRE'],['DATO','"+m['column']+"']","['DATO','"+ctx['text']['column']+"'],['DATO','"+m['column']+"']")
    runtime=runtime.replace("['ID','PK'],['NOMBRE',''],['"+m['column']+"','']","['ID','PK'],['"+ctx['text']['column']+"',''],['"+m['column']+"','']")
    write(folder/'taller.js',runtime)
    diagram=translated(SVG)
    # Solo cambia el campo de texto del hijo, no los nombres de padre ni perfiles.
    diagram=diagram.replace('PROPUESTA · ESQUEMA LÓGICO RELACIONAL',case_id+' · ESQUEMA LÓGICO RELACIONAL')
    diagram=diagram.replace('x="671" y="385.5" font-size="21" font-family="Consolas, Menlo, monospace">NOMBRE', 'x="671" y="385.5" font-size="21" font-family="Consolas, Menlo, monospace">'+ctx['text']['column'])
    diagram=diagram.replace('ID_PROFESIONAL', 'ID_'+person.upper())
    # Encabezados y campos largos mantienen espacio para las insignias PK/FK.
    diagram=diagram.replace('font-size="25"','font-size="21"').replace('font-size="21" font-family="Consolas','font-size="18" font-family="Consolas')
    write(folder/'esquema-logico.svg',diagram)
    write(folder/'index.html',f'<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{case_id} · {title} · N:M</title><link rel="stylesheet" href="../../taller.css?v=orm-todos-1"></head><body><main id="nm-root"><p role="status">Preparando tu ampliación N:M…</p></main><script type="module" src="taller.js?v=orm-todos-1"></script></body></html>\n')
    write(folder/'README.md',f'# {case_id} · {title} · N:M\n\nContinúa tu proyecto **{ctx["title"]}** ya preparado. No reinstales ni reemplaces el 1:N.\n\nAñade **{person}** (ID, NOMBRE, APELLIDOS, EMAIL) y **Asignacion**, cuya clave compuesta es `(ID_{n["sql"]}, ID_{person.upper()})`, con ROL como dato del vínculo.\n\nEn DynamoDB, ASIGNACIONES tiene PK `{n["sql"]}_ID` y SK `{person.upper()}_ID`; el índice `Por{person}` invierte ambas claves y proyecta ROL.\n\nRecorre los diez apartados del [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm) seleccionando tu correo. Alterna Nest + TypeORM / Serverless + Toolbox. Los directorios `codigo/nest` y `codigo/cloud` contienen la referencia completa, pero cada paso te proporciona el archivo acumulativo que corresponde a ese momento.\n\n[Fichas N:M para imprimir](fichas-nm.pdf) · [Esquema lógico](esquema-logico.svg)\n\n{final_note} Los números de la ficha son ejemplos visuales. En Nest, las pruebas utilizan los IDs reales cargados desde `ids-aula.env`; los archivos `src/datos/cargar-datos.ts` y `src/datos/cargar-datos-nm.ts` utilizan las Entities de TypeORM, sin SQL manual.\n\nLos seis casos enseñan alta/listado, asignación, lectura en ambas direcciones, cambio de rol y eliminación del vínculo. Se conservan ambos extremos. En Serverless, todos los repositories utilizan `MODELO.build(EntityRepository)`. Cada caso incluye curl y evento/Invoke compatibles con su handler.\n')
    from version_estudio import write_runtime
    write_runtime(case_id)
    if args.pdf:
        pdfprogram=translated(PDF)
        pdfprogram=pdfprogram.replace('scripts/plantillas/nm-'+case_id.lower().replace('-','')+'-impreso.json',f'scripts/plantillas/nm-impreso/{case_id}.json')
        pdfprogram=pdfprogram.replace("N=R/'nm'",f"N=R/'nm/casos/{case_id}'")
        pdf_directory='nm-docente' if case_id=='CH-13' else 'nm-alumnado'
        pdfprogram=pdfprogram.replace("O=R.parent/'output/pdf/nm-arturo-fichas.pdf'",f"O=R.parent/'output/pdf/{pdf_directory}/{case_id}-nm.pdf'")
        pdfprogram=re.sub(r"str\(R.parent/'output/preview/nm-[^']+/esquema-logico.png'\)","str(N/'esquema-logico.png')",pdfprogram)
        pdfprogram=pdfprogram.replace("N/'fichas-nm-"+case_id.lower().replace('-','')+".pdf'","N/'fichas-nm.pdf'")
        # Ancho/fuente adaptable a identificadores largos; no cambiar el código.
        pdfprogram=pdfprogram.replace('assert y-h>35,(page,title,y,h,len(lines))', "\n while y-h<=35 and font>6.7:\n  font-=.15;leading=font*1.27;h=27+leading*len(lines)+10\n assert y-h>35,(page,title,y,h,len(lines))")
        pdfprogram=pdfprogram.replace('presupuesto 15000',f"{m['label'].lower()} {m['after']}")
        with contextlib.redirect_stdout(io.StringIO()):exec(compile(pdfprogram,'nm-pdf-'+case_id,'exec'),{'__file__':str(ROOT/'scripts/fichas-nm.py'),'__name__':'__nm_pdf__'})
    print(case_id,title,len(data['tracks']['nest']),len(data['tracks']['cloud']))

write(NM/'contextos.json',json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
rows=['# Recorridos N:M de todo el alumnado','',
      'En el [cuaderno de clase](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm), cada alumno elige su correo y después **Relación N:M**. Conserva su recorrido 1:N y su avance. Cada ampliación continúa el proyecto propio ya configurado, con los seis casos y sus fichas. Todos los contextos tienen 38 pasos Nest sencillos, con synchronize: true, dos Entities nuevas y altas mediante los Controllers, sin otra precarga ni SQL externo. Serverless tiene 58 pasos, sin precarga: las altas pasan por sus Handlers y Services.','',
      '| Caso | Proyecto 1:N existente | Ampliación N:M | Material |',
      '| --- | --- | --- | --- |']
for case_id,meta in manifest.items():
    if case_id=='CH-13':continue
    relative='.' if case_id=='CH-22' else 'casos/'+case_id
    pdf='fichas-nm-ch22.pdf' if case_id=='CH-22' else relative+'/fichas-nm.pdf'
    rows.append(f'| {case_id} | {meta["baselineTitle"]} | {meta["title"]} | [Recorrido]({relative}/) · [PDF]({pdf}) · [Código]({relative}/codigo) |')
rows+=['','Ejemplo docente adicional: [Cine–Proyección–Técnico](casos/CH-13/) · [PDF](casos/CH-13/fichas-nm.pdf).',
       '', 'Cada caso incluye Entities de TypeORM completas, módulo acumulativo y Controller → Service → Entity; en Serverless, YAML, Table + Entity, Handler → Service → Repository, curl e Invoke. Las lecturas inversas usan Query sobre el índice y conservan el mismo vínculo.']
write(NM/'RECORRIDOS.md','\n'.join(rows)+'\n')
