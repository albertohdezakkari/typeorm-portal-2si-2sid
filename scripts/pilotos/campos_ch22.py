"""Lectura completa de los campos ya presentes en la ficha CH-22.

No modifica los esquemas ni los ejemplos ejecutables. Amplía los focos de
lectura y vincula cada atributo del ER con su declaración en ambos recorridos.
"""
import copy


def apply(data):
    if data['context']['id'] != 'CH-22':
        return
    cloud = data['steps']['cloud']
    previous = copy.deepcopy(cloud[2]['cues'])
    cloud[2]['cues'] = [
        dict(text='export const TABLA_AYUNTAMIENTOS = new Table({', title='Primero, la tabla Ayuntamiento', note='Table describe AYUNTAMIENTOS: su nombre, cliente y clave. Los atributos normales se definen después en Entity.'),
        dict(text="partitionKey: { name: 'AYUNTAMIENTO_ID', type: 'number' }", title='La clave del ayuntamiento', note='AYUNTAMIENTO_ID identifica cada ayuntamiento. NOMBRE también se guarda, pero su tipo se declara en MODELO_AYUNTAMIENTO.'),
        *previous,
    ]
    previous = copy.deepcopy(cloud[3]['cues'])
    parent = 'export const MODELO_AYUNTAMIENTO'
    child = 'export const MODELO_OBRA'
    cloud[3]['cues'] = [
        dict(text=parent+' = new Entity({', title='Los campos del ayuntamiento', note='Esta Entity reúne los dos atributos del ER: el identificador y el nombre. Table indica dónde se guardan.'),
        dict(text="ayuntamientoId: number().key().savedAs('AYUNTAMIENTO_ID')", after=parent, title='ID del ayuntamiento → AYUNTAMIENTO_ID', note='En el ER es ID. En DynamoDB lo llamamos AYUNTAMIENTO_ID. number() es el tipo y key() lo vincula a la partition key de AYUNTAMIENTOS.'),
        dict(text="nombre: string().savedAs('NOMBRE')", after=parent, title='NOMBRE también se configura', note='string() describe el texto del ayuntamiento. savedAs guarda la propiedad nombre con el atributo NOMBRE. No es una clave.'),
        previous[0], previous[1], previous[2],
        dict(text="nombre: string().savedAs('NOMBRE')", after=child, title='El nombre de la obra', note='Esta línea pertenece a MODELO_OBRA. Guarda el texto nombre en NOMBRE, dentro del ítem de OBRAS.'),
        previous[3], previous[4], previous[5],
    ]
    for cue in cloud[3]['cues'][3:9]:
        cue.setdefault('after', child)
    cloud[3]['cues'][7].update(title='PRESUPUESTO_EUROS también se configura', note='number() describe el presupuesto. savedAs guarda presupuestoEuros en PRESUPUESTO_EUROS. Es un dato de la obra; no forma parte de la clave principal.')
    cloud[3]['cues'][8].update(title='La referencia al ayuntamiento', note='ayuntamientoId se guarda en AYUNTAMIENTO_ID. Es la referencia al ayuntamiento y la partition key del GSI PorAyuntamiento. DynamoDB no comprueba una foreign key entre tablas.')
    cloud[1]['cues'][0]['note'] = 'El YAML crea AYUNTAMIENTOS y declara su clave AYUNTAMIENTO_ID. Su atributo NOMBRE se describe con string() en MODELO_AYUNTAMIENTO.'
    cloud[1]['cues'][1]['note'] = 'OBRAS tiene OBRA_ID como partition key. Sus ítems guardan además NOMBRE, PRESUPUESTO_EUROS y AYUNTAMIENTO_ID; los cuatro aparecen en MODELO_OBRA.'
    data['steps']['nest'][2]['cues'][2]['title'] = 'NOMBRE es una columna de Obra'
    data['steps']['nest'][2]['cues'][3]['title'] = 'PRESUPUESTO_EUROS es una columna numérica'

    def field(er, role, example, nest, cloud):
        return dict(er=er, role=role, example=example, nest=nest, cloud=cloud)

    def target(prop, column, kind, step, cue):
        return dict(property=prop, column=column, type=kind, step=step, cue=cue)

    data['fieldGuide'] = dict(entities=[
        dict(name='Ayuntamiento', sql='AYUNTAMIENTO', dynamo='AYUNTAMIENTOS', fields=[
            field('ID', 'key', 1, target('id','ID','number',1,1),target('ayuntamientoId','AYUNTAMIENTO_ID','number()',3,1)),
            field('NOMBRE', 'data', data['context']['parent']['examples'][0], target('nombre','NOMBRE','varchar(120)',1,2),target('nombre','NOMBRE','string()',3,2)),
        ]),
        dict(name='Obra', sql='OBRA', dynamo='OBRAS', fields=[
            field('ID', 'key', 7, target('id','ID','number',2,1),target('obraId','OBRA_ID','number()',3,5)),
            field('NOMBRE', 'data', data['fixtures'][0]['name'], target('nombre','NOMBRE','varchar(120)',2,2),target('nombre','NOMBRE','string()',3,6)),
            field('PRESUPUESTO_EUROS', 'data', data['fixtures'][0]['value'], target('presupuestoEuros','PRESUPUESTO_EUROS','integer',2,3),target('presupuestoEuros','PRESUPUESTO_EUROS','number()',3,7)),
            field('ID_AYUNTAMIENTO', 'reference', 1, target('ayuntamiento.id','ID_AYUNTAMIENTO','FK · integer',3,3),target('ayuntamientoId','AYUNTAMIENTO_ID','number()',3,8)),
        ]),
    ])
    data['preparationRevision'] = 1
    data['revisedSteps'] = ['cloud:2','cloud:3']
