import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_MECANICOS = new Table({
  name: process.env.TABLA_MECANICOS,
  documentClient: db,
  partitionKey: { name: 'MECANICO_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'REPARACION_ID', type: 'number' },
  sortKey: { name: 'MECANICO_ID', type: 'number' },
  indexes: {
    PorMecanico: {
      type: 'global',
      partitionKey: { name: 'MECANICO_ID', type: 'number' },
      sortKey: { name: 'REPARACION_ID', type: 'number' }
    }
  }
});

export const MODELO_MECANICO = new Entity({
  name: 'Mecanico',
  table: TABLA_MECANICOS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    mecanicoId: number().key().savedAs('MECANICO_ID'),
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
    reparacionId: number().key().savedAs('REPARACION_ID'),
    mecanicoId: number().key().savedAs('MECANICO_ID'),
    rol: string().savedAs('ROL')
  })
});
