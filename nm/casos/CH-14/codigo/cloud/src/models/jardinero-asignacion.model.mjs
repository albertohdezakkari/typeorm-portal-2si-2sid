import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_JARDINEROS = new Table({
  name: process.env.TABLA_JARDINEROS,
  documentClient: db,
  partitionKey: { name: 'JARDINERO_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'ZONA_ID', type: 'number' },
  sortKey: { name: 'JARDINERO_ID', type: 'number' },
  indexes: {
    PorJardinero: {
      type: 'global',
      partitionKey: { name: 'JARDINERO_ID', type: 'number' },
      sortKey: { name: 'ZONA_ID', type: 'number' }
    }
  }
});

export const MODELO_JARDINERO = new Entity({
  name: 'Jardinero',
  table: TABLA_JARDINEROS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    jardineroId: number().key().savedAs('JARDINERO_ID'),
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
    zonaId: number().key().savedAs('ZONA_ID'),
    jardineroId: number().key().savedAs('JARDINERO_ID'),
    rol: string().savedAs('ROL')
  })
});
