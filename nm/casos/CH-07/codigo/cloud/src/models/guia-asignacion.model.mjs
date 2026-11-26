import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_GUIAS = new Table({
  name: process.env.TABLA_GUIAS,
  documentClient: db,
  partitionKey: { name: 'GUIA_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'EXCURSION_ID', type: 'number' },
  sortKey: { name: 'GUIA_ID', type: 'number' },
  indexes: {
    PorGuia: {
      type: 'global',
      partitionKey: { name: 'GUIA_ID', type: 'number' },
      sortKey: { name: 'EXCURSION_ID', type: 'number' }
    }
  }
});

export const MODELO_GUIA = new Entity({
  name: 'Guia',
  table: TABLA_GUIAS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    guiaId: number().key().savedAs('GUIA_ID'),
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
    excursionId: number().key().savedAs('EXCURSION_ID'),
    guiaId: number().key().savedAs('GUIA_ID'),
    rol: string().savedAs('ROL')
  })
});
