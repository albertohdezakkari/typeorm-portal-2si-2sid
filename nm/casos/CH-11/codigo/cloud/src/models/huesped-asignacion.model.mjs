import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_HUESPEDES = new Table({
  name: process.env.TABLA_HUESPEDES,
  documentClient: db,
  partitionKey: { name: 'HUESPED_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'RESERVA_ID', type: 'number' },
  sortKey: { name: 'HUESPED_ID', type: 'number' },
  indexes: {
    PorHuesped: {
      type: 'global',
      partitionKey: { name: 'HUESPED_ID', type: 'number' },
      sortKey: { name: 'RESERVA_ID', type: 'number' }
    }
  }
});

export const MODELO_HUESPED = new Entity({
  name: 'Huesped',
  table: TABLA_HUESPEDES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    huespedId: number().key().savedAs('HUESPED_ID'),
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
    reservaId: number().key().savedAs('RESERVA_ID'),
    huespedId: number().key().savedAs('HUESPED_ID'),
    rol: string().savedAs('ROL')
  })
});
