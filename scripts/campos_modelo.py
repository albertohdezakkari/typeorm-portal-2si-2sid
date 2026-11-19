"""Extiende a cada contexto la lectura completa validada en Arturo.

Conserva los modelos y valores de las fichas. Los focos, enlaces y comentarios
se derivan de cada contexto; no se sustituyen sus entidades por las del ejemplo.
"""
import copy


def apply(data):
    context = data['context']
    parent, child, metric = context['parent'], context['child'], context['metric']
    text = context['text']
    parent_key, child_key = parent['sql']+'_ID', child['sql']+'_ID'
    cloud = data['steps']['cloud']
    # El ejemplo docente usa PELICULA, mientras el nombre del cine sigue siendo NOMBRE.
    if text['column'] != 'NOMBRE':
        cloud[1]['code'] = cloud[1]['code'].replace('                - NOMBRE\n', '                - '+text['column']+'\n')
    inventories = [
        (parent, [f"NOMBRE (S: texto)."]),
        (child, [f"{text['column']} (S: texto).", f"{metric['column']} (N: número).", f"{parent_key} (N: referencia y clave del GSI)."]),
    ]
    for entity, fields in inventories:
        original = '        TableName: '+entity['table']
        assert original in cloud[1]['code'], (context['id'], entity['table'])
        comment = '\n'.join([
            original,
            f"        # PARTITION KEY: {entity['sql']}_ID (N: número).",
            '        # CAMPOS NO CLAVE de esta tabla (fuera de su PK):',
            *['        #   '+field for field in fields],
            f"        # Sus tipos se describen en {entity['model']}.",
        ])
        cloud[1]['code'] = cloud[1]['code'].replace(original, comment)
    cloud[1]['code'] = cloud[1]['code'].replace(
        'NonKeyAttributes:        # Campos extra del listado.',
        f"NonKeyAttributes:        # Campos de {child['table']} copiados al índice."
    )
    cloud[1]['annotated'] = True
    previous = copy.deepcopy(cloud[2]['cues'])
    parent_model, child_model = 'export const '+parent['model'], 'export const '+child['model']
    cloud[2]['cues'] = [
        dict(text=f"export const {parent['variable']} = new Table({{", title='Primero, Table de '+parent['entity'], note=f"Table describe {parent['table']}: nombre, cliente y clave. NOMBRE se describe después en Entity."),
        dict(text=f"partitionKey: {{ name: '{parent_key}', type: 'number' }}", title='Clave de '+parent['entity'], note=f"{parent_key} identifica cada registro de {parent['table']}. El tipo de NOMBRE se declara en {parent['model']}."),
        *previous,
    ]
    previous = copy.deepcopy(cloud[3]['cues'])
    cloud[3]['cues'] = [
        dict(text=parent_model+' = new Entity({', title='Campos de '+parent['entity'], note=f"Esta Entity reúne los dos atributos del ER: identificador y nombre. Table indica que se guardan en {parent['table']}."),
        dict(text=f"{parent['input']}: number().key().savedAs('{parent_key}')", after=parent_model, title='ID → '+parent_key, note=f"En el ER es ID. En DynamoDB se guarda como {parent_key}. number() define el tipo; key() lo vincula a la partition key de {parent['table']}."),
        dict(text="nombre: string().savedAs('NOMBRE')", after=parent_model, title='NOMBRE también se configura', note=f"string() describe el texto de {parent['entity']}. savedAs guarda nombre en NOMBRE. Este atributo no es una clave."),
        previous[0], previous[1], previous[2],
        dict(text=f"{text['property']}: string().savedAs('{text['column']}')", after=child_model, title='Texto de '+child['entity']+' → '+text['column'], note=f"Esta línea pertenece a {child['model']}. Guarda {text['property']} en {text['column']}, dentro del ítem de {child['table']}."),
        previous[3], previous[4], previous[5],
    ]
    for cue in cloud[3]['cues'][3:9]:
        cue.setdefault('after', child_model)
    cloud[3]['cues'][7].update(title=metric['column']+' también se configura', note=f"number() describe {metric['property']}. savedAs lo guarda en {metric['column']}. Es un dato de {child['entity']}; no forma parte de la clave principal.")
    cloud[3]['cues'][8].update(title='Referencia a '+parent['entity'], note=f"{parent['input']} se guarda en {parent_key}. Es la referencia a {parent['entity']} y la partition key del GSI {context['index']}. DynamoDB no comprueba una foreign key entre tablas.")
    cloud[1]['cues'][0]['note'] = f"El YAML crea {parent['table']} y declara su clave {parent_key}. El inventario comentado recuerda NOMBRE; su tipo se describe en {parent['model']}."
    cloud[1]['cues'][1]['note'] = f"{child['table']} usa {child_key} como partition key. Los otros atributos son {text['column']}, {metric['column']} y {parent_key}; los cuatro aparecen en {child['model']}."
    cloud[1]['cues'][4]['note'] = f"INCLUDE copia al índice las claves y los atributos {text['column']} y {metric['column']}. Esos datos pertenecen a {child['table']}."
    data['steps']['nest'][2]['cues'][2]['title'] = text['column']+' es una columna de '+child['entity']
    data['steps']['nest'][2]['cues'][3]['title'] = metric['column']+' es una columna numérica'

    def target(prop, column, kind, step, cue):
        return dict(property=prop, column=column, type=kind, step=step, cue=cue)

    def field(er, role, example, nest, cloud):
        return dict(er=er, role=role, example=example, nest=nest, cloud=cloud)

    data['fieldGuide'] = dict(entities=[
        dict(name=parent['entity'], sql=parent['sql'], dynamo=parent['table'], fields=[
            field('ID','key',1,target('id','ID','number',1,1),target(parent['input'],parent_key,'number()',3,1)),
            field('NOMBRE','data',parent['examples'][0],target('nombre','NOMBRE','varchar(120)',1,2),target('nombre','NOMBRE','string()',3,2)),
        ]),
        dict(name=child['entity'], sql=child['sql'], dynamo=child['table'], fields=[
            field('ID','key',7,target('id','ID','number',2,1),target(child['input'],child_key,'number()',3,5)),
            field(text['column'],'data',data['fixtures'][0]['name'],target(text['property'],text['column'],'varchar(120)',2,2),target(text['property'],text['column'],'string()',3,6)),
            field(metric['column'],'data',data['fixtures'][0]['value'],target(metric['property'],metric['column'],'integer',2,3),target(metric['property'],metric['column'],'number()',3,7)),
            field(context['foreignKey'],'reference',1,target(parent['property']+'.id',context['foreignKey'],'FK · integer',3,3),target(parent['input'],parent_key,'number()',3,8)),
        ]),
    ])
    data['preparationRevision'] = 1
    data['revisedSteps'] = ['cloud:2','cloud:3']
