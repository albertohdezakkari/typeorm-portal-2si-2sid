import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_MONITORES = new Table({
  name: process.env.TABLA_MONITORES,
  documentClient: db,
  partitionKey: { name: 'MONITOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'ACTIVIDAD_ID', type: 'number' },
  sortKey: { name: 'MONITOR_ID', type: 'number' },
  indexes: {
    PorMonitor: {
      type: 'global',
      partitionKey: { name: 'MONITOR_ID', type: 'number' },
      sortKey: { name: 'ACTIVIDAD_ID', type: 'number' }
    }
  }
});

export const MODELO_MONITOR = new Entity({
  name: 'Monitor',
  table: TABLA_MONITORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    monitorId: number().key().savedAs('MONITOR_ID'),
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
    actividadId: number().key().savedAs('ACTIVIDAD_ID'),
    monitorId: number().key().savedAs('MONITOR_ID'),
    rol: string().savedAs('ROL')
  })
});
