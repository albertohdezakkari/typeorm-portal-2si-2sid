import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_AGRICULTORES = new Table({
  name: process.env.TABLA_AGRICULTORES,
  documentClient: db,
  partitionKey: { name: 'AGRICULTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'COSECHA_ID', type: 'number' },
  sortKey: { name: 'AGRICULTOR_ID', type: 'number' },
  indexes: {
    PorAgricultor: {
      type: 'global',
      partitionKey: { name: 'AGRICULTOR_ID', type: 'number' },
      sortKey: { name: 'COSECHA_ID', type: 'number' }
    }
  }
});

export const MODELO_AGRICULTOR = new Entity({
  name: 'Agricultor',
  table: TABLA_AGRICULTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    agricultorId: number().key().savedAs('AGRICULTOR_ID'),
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
    cosechaId: number().key().savedAs('COSECHA_ID'),
    agricultorId: number().key().savedAs('AGRICULTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
