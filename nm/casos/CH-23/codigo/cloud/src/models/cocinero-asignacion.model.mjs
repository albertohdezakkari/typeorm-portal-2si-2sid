import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_COCINEROS = new Table({
  name: process.env.TABLA_COCINEROS,
  documentClient: db,
  partitionKey: { name: 'COCINERO_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'COMANDA_ID', type: 'number' },
  sortKey: { name: 'COCINERO_ID', type: 'number' },
  indexes: {
    PorCocinero: {
      type: 'global',
      partitionKey: { name: 'COCINERO_ID', type: 'number' },
      sortKey: { name: 'COMANDA_ID', type: 'number' }
    }
  }
});

export const MODELO_COCINERO = new Entity({
  name: 'Cocinero',
  table: TABLA_COCINEROS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    cocineroId: number().key().savedAs('COCINERO_ID'),
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
    comandaId: number().key().savedAs('COMANDA_ID'),
    cocineroId: number().key().savedAs('COCINERO_ID'),
    rol: string().savedAs('ROL')
  })
});
