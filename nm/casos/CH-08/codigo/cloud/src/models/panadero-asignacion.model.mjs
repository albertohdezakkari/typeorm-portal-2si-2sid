import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_PANADEROS = new Table({
  name: process.env.TABLA_PANADEROS,
  documentClient: db,
  partitionKey: { name: 'PANADERO_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PRODUCTO_ID', type: 'number' },
  sortKey: { name: 'PANADERO_ID', type: 'number' },
  indexes: {
    PorPanadero: {
      type: 'global',
      partitionKey: { name: 'PANADERO_ID', type: 'number' },
      sortKey: { name: 'PRODUCTO_ID', type: 'number' }
    }
  }
});

export const MODELO_PANADERO = new Entity({
  name: 'Panadero',
  table: TABLA_PANADEROS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    panaderoId: number().key().savedAs('PANADERO_ID'),
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
    productoId: number().key().savedAs('PRODUCTO_ID'),
    panaderoId: number().key().savedAs('PANADERO_ID'),
    rol: string().savedAs('ROL')
  })
});
