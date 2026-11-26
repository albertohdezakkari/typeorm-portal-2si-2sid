import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_INSPECTORES = new Table({
  name: process.env.TABLA_INSPECTORES,
  documentClient: db,
  partitionKey: { name: 'INSPECTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'LOTE_ID', type: 'number' },
  sortKey: { name: 'INSPECTOR_ID', type: 'number' },
  indexes: {
    PorInspector: {
      type: 'global',
      partitionKey: { name: 'INSPECTOR_ID', type: 'number' },
      sortKey: { name: 'LOTE_ID', type: 'number' }
    }
  }
});

export const MODELO_INSPECTOR = new Entity({
  name: 'Inspector',
  table: TABLA_INSPECTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    inspectorId: number().key().savedAs('INSPECTOR_ID'),
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
    loteId: number().key().savedAs('LOTE_ID'),
    inspectorId: number().key().savedAs('INSPECTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
