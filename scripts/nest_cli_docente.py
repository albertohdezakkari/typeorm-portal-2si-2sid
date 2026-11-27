"""Creación con Nest CLI; el alumno completa los archivos generados."""
from pathlib import PurePosixPath

KINDS=['module','service','controller']
def kind(path):
    return next((k for k in KINDS if path.endswith('.'+k+'.ts')),None)

def command(k,name):
    return 'npx --offline nest g '+k+' '+name+(' --no-spec'if k!='module'else'')

def creation(path,seen):
    k=kind(path);name=PurePosixPath(path).parent.name
    if path in seen or path in ['src/app.module.ts','src/salud.controller.ts']:
        return 'code '+path,'Abre el archivo existente','Este archivo ya existe. Ábrelo y completa el contenido; no repitas el comando generate.'
    module=f'src/{name}/{name}.module.ts';commands=[]
    if k=='module':
        commands=[command(k,name)];seen.add(path)
    elif module not in seen:
        # El módulo debe existir antes de generar sus clases, para que la CLI
        # registre el Service y el Controller en ese módulo, no en AppModule.
        commands=[command(t,name)for t in KINDS]
        seen.update(f'src/{name}/{name}.{t}.ts'for t in KINDS)
    else:commands=[command(k,name)];seen.add(path)
    return '\n'.join(commands+['code '+path]),'Genera con Nest CLI y abre el archivo','Ejecuta desde backend, donde están package.json y nest-cli.json. Nest crea las carpetas y registra las clases automáticamente. Si ya generaste estos archivos, abre el archivo indicado sin repetir generate. Después completa su contenido y guarda.'

def set_creation(item,seen):
    path=item.get('path','')
    if not kind(path):return
    item['create'],item['createTitle'],item['createNote']=creation(path,seen)

def training(data):
    seen={'src/app.module.ts','src/salud.controller.ts'}
    for s in data['steps']['nest']:
        set_creation(s,seen)
        if s['name']=='Registrar Service y Controller':s['name']='Comprobar registro automático'
        if s.get('path')=='src/app.module.ts':s['name']='Comprueba ambos módulos en AppModule'
    data['nestCliRevision']=1
    return data

def preparation(data,train):
    seen={'src/app.module.ts','src/salud.controller.ts'}
    for phase in data['tracks']['nest']:
        if phase['id']=='modelos':
            # Generar primero ambos módulos. Copiar AppModule antes provocaría
            # que la CLI añadiera de nuevo una importación escrita a mano.
            phase['blocks'].sort(key=lambda b:b.get('path')=='src/app.module.ts')
        for block in phase['blocks']:set_creation(block,seen)
    data['nestCliRevision']=1
    return data

def nm(data,files):
    seen={'src/app.module.ts'}
    for s in data['tracks']['nest']:
        set_creation(s,seen)
        if s['id']=='asignaciones-modulo':
            s['note']='Genera AsignacionesModule con Nest CLI. El comando crea la carpeta y registra el módulo en AppModule. Después completa este archivo con las tres Entities del caso y TypeOrmModule.forFeature. Cuando generes el Service y el Controller, Nest los añadirá a este mismo módulo.'
        if s['id']=='registrar':
            s['title']='Comprueba el módulo en AppModule'
            c=data['apiContext'];p,n=c['parent'],c['child'];profile=data['apiProfile']['route'].capitalize()
            s['note']='Nest CLI ya ha añadido AsignacionesModule. Comprueba que aparece una sola vez y conserva '+p['route'].capitalize()+'Module, '+n['route'].capitalize()+'Module y la conexión 1:N. Si seguiste la versión anterior, retira '+profile+'Module y sus archivos de módulo, Service y Controller; conserva su Entity. No añadas otra importación de AsignacionesModule.'
        if s['id']=='crear-listar-registro':
            s['title']='Comprueba el registro automático'
            s['note']='Los comandos nest g service y nest g controller ya han registrado AsignacionesService en providers y AsignacionesController en controllers. Comprueba este mismo archivo: conserva las tres Entities en forFeature y cada clase registrada una sola vez.'
    data['nestCliRevision']=1
