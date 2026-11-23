"""Actualiza código y pistas de Serverless sin modificar el recorrido de Nest."""
from toolbox_entity_repository import entity_repository


def apply(data):
    context=data['context'];parent=context['parent'];child=context['child'];metric=context['metric']
    revised=[]
    for index,step in enumerate(data['steps']['cloud']):
        if not step['path'].endswith('/repository.mjs'):
            continue
        step['code']=entity_repository(step['code'])
        source=step['code'];cues=[]
        def cue(text,title,note,after=None):
            start=source.find(text,source.find(after) if after else 0)
            assert start>=0,(context['id'],index,text)
            item=dict(text=text,title=title,note=note)
            if after:item['after']=after
            cues.append(item)
        cue('EntityRepository','Siempre desde la Entity','Esta utilidad oficial de Toolbox permite get, put, scan, query, update y delete desde el modelo. No es una capa nueva de nuestra aplicación.')
        if step['chapter'] in (0,1):
            if step['chapter']==0:
                model_import=next(line for line in source.splitlines() if line.startswith('import { MODELO_'))
                cue(model_import,'Importar el modelo preparado','El repository importa la Entity desde models. Table queda vinculada dentro del modelo; no se importa aquí.')
            cue('.put(','Guardar con el modelo','put envía PutItemCommand usando los tipos y savedAs de la Entity. Devuelve una promesa y no necesita .send().')
            cue('exists: false','Conservar un registro existente','La condición impide sobrescribir un ítem con la misma clave.')
            cue('.scan(','Listar con el mismo modelo','scan envía ScanCommand desde la misma Entity y devuelve Items. Esta página basta para los datos de la ficha; con más registros hay que paginar.')
            cue('{ consistent: true }','Opciones de la lectura','La lectura fuerte se configura en el argumento de opciones del método scan.',' .scan(' if ' .scan(' in source else '.scan(')
        elif step['chapter']==2:
            cue('.delete(','Eliminar mediante la Entity','delete envía DeleteItemCommand; no lleva .send().')
            cue('{ '+child['input']+' }','La clave del ítem','La clave identifica únicamente el registro asociado que quieres eliminar.')
        elif step['chapter'] in (3,4):
            field=metric['property'] if step['chapter']==3 else parent['input']
            cue('.update(','Modificar mediante la Entity','update envía UpdateItemCommand conservando los demás atributos del ítem.')
            cue('{ '+child['input']+', '+field+' }','Clave y dato que cambia','El primer valor localiza el registro. '+field+' es el único dato que se modifica.')
            cue('exists: true','Modificar un ítem existente','Esta condición evita crear un registro nuevo si no existe la clave.')
            cue("returnValues: 'ALL_NEW'",'Recibir el registro actualizado','El resultado contiene Attributes con los datos después de la modificación.')
        elif step['chapter']==5:
            cue('.get(','Leer el registro principal','get utiliza la clave completa y envía GetItemCommand desde '+parent['model']+'.')
            cue('{ '+parent['input']+' }','Identificador del registro principal','La Entity traduce este identificador al nombre físico de su clave.')
            cue('.query(','Consultar desde el modelo asociado','query envía QueryCommand usando Table y sus índices, que la Entity ya conoce.')
            cue("index: '"+context['index']+"'",'Elegir el índice inverso','El índice agrupa los registros asociados por '+parent['input']+'.')
            cue("attr: '"+metric['property']+"', gte: minimo",'Filtrar el grupo leído','gte significa mayor o igual. El filtro se aplica después de leer y no reduce esa lectura.')
        step['cues']=cues
        step['exact']=False
        step['entityAccess']=True
        revised.append('cloud:'+str(index))
    assert len(revised)==6,(context['id'],revised)
    data['entityAccessRevision']=1
    data['entityAccessSteps']=revised
    return data
