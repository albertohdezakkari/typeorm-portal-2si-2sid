import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ENFERMEROS = new Table({
  name: process.env.TABLA_ENFERMEROS,
  documentClient: db,
  partitionKey: { name: 'ENFERMERO_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'HABITACION_ID', type: 'number' },
  sortKey: { name: 'ENFERMERO_ID', type: 'number' },
  indexes: {
    PorEnfermero: {
      type: 'global',
      partitionKey: { name: 'ENFERMERO_ID', type: 'number' },
      sortKey: { name: 'HABITACION_ID', type: 'number' }
    }
  }
});

export const MODELO_ENFERMERO = new Entity({
  name: 'Enfermero',
  table: TABLA_ENFERMEROS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    enfermeroId: number().key().savedAs('ENFERMERO_ID'),
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
    habitacionId: number().key().savedAs('HABITACION_ID'),
    enfermeroId: number().key().savedAs('ENFERMERO_ID'),
    rol: string().savedAs('ROL')
  })
});
