import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ANALISTAS = new Table({
  name: process.env.TABLA_ANALISTAS,
  documentClient: db,
  partitionKey: { name: 'ANALISTA_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'MUESTRA_ID', type: 'number' },
  sortKey: { name: 'ANALISTA_ID', type: 'number' },
  indexes: {
    PorAnalista: {
      type: 'global',
      partitionKey: { name: 'ANALISTA_ID', type: 'number' },
      sortKey: { name: 'MUESTRA_ID', type: 'number' }
    }
  }
});

export const MODELO_ANALISTA = new Entity({
  name: 'Analista',
  table: TABLA_ANALISTAS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    analistaId: number().key().savedAs('ANALISTA_ID'),
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
    muestraId: number().key().savedAs('MUESTRA_ID'),
    analistaId: number().key().savedAs('ANALISTA_ID'),
    rol: string().savedAs('ROL')
  })
});
