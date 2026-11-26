import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_INTERPRETES = new Table({
  name: process.env.TABLA_INTERPRETES,
  documentClient: db,
  partitionKey: { name: 'INTERPRETE_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'FUNCION_ID', type: 'number' },
  sortKey: { name: 'INTERPRETE_ID', type: 'number' },
  indexes: {
    PorInterprete: {
      type: 'global',
      partitionKey: { name: 'INTERPRETE_ID', type: 'number' },
      sortKey: { name: 'FUNCION_ID', type: 'number' }
    }
  }
});

export const MODELO_INTERPRETE = new Entity({
  name: 'Interprete',
  table: TABLA_INTERPRETES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    interpreteId: number().key().savedAs('INTERPRETE_ID'),
    nombre: string().savedAs('NOMBRE'),
    apellidos: string().savedAs('APELLIDOS'),
    email: string().savedAs('EMAIL')
  })
});

export const MODELO_ASIGNACION = new Entity({
  name: 'Asignacion',
  table: TABLA_ASIGNACIONES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    funcionId: number().key().savedAs('FUNCION_ID'),
    interpreteId: number().key().savedAs('INTERPRETE_ID'),
    rol: string().savedAs('ROL')
  })
});
