import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_REVISORES = new Table({
  name: process.env.TABLA_REVISORES,
  documentClient: db,
  partitionKey: { name: 'REVISOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'DOCUMENTO_ID', type: 'number' },
  sortKey: { name: 'REVISOR_ID', type: 'number' },
  indexes: {
    PorRevisor: {
      type: 'global',
      partitionKey: { name: 'REVISOR_ID', type: 'number' },
      sortKey: { name: 'DOCUMENTO_ID', type: 'number' }
    }
  }
});

export const MODELO_REVISOR = new Entity({
  name: 'Revisor',
  table: TABLA_REVISORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    revisorId: number().key().savedAs('REVISOR_ID'),
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
    documentoId: number().key().savedAs('DOCUMENTO_ID'),
    revisorId: number().key().savedAs('REVISOR_ID'),
    rol: string().savedAs('ROL')
  })
});
