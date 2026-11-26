import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_CONDUCTORES = new Table({
  name: process.env.TABLA_CONDUCTORES,
  documentClient: db,
  partitionKey: { name: 'CONDUCTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'TRAYECTO_ID', type: 'number' },
  sortKey: { name: 'CONDUCTOR_ID', type: 'number' },
  indexes: {
    PorConductor: {
      type: 'global',
      partitionKey: { name: 'CONDUCTOR_ID', type: 'number' },
      sortKey: { name: 'TRAYECTO_ID', type: 'number' }
    }
  }
});

export const MODELO_CONDUCTOR = new Entity({
  name: 'Conductor',
  table: TABLA_CONDUCTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    conductorId: number().key().savedAs('CONDUCTOR_ID'),
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
    trayectoId: number().key().savedAs('TRAYECTO_ID'),
    conductorId: number().key().savedAs('CONDUCTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
