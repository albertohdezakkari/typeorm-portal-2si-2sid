import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_PROFESIONALES = new Table({
  name: process.env.TABLA_PROFESIONALES,
  documentClient: db,
  partitionKey: { name: 'PROFESIONAL_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'OBRA_ID', type: 'number' },
  sortKey: { name: 'PROFESIONAL_ID', type: 'number' },
  indexes: {
    PorProfesional: {
      type: 'global',
      partitionKey: { name: 'PROFESIONAL_ID', type: 'number' },
      sortKey: { name: 'OBRA_ID', type: 'number' }
    }
  }
});

export const MODELO_PROFESIONAL = new Entity({
  name: 'Profesional',
  table: TABLA_PROFESIONALES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    profesionalId: number().key().savedAs('PROFESIONAL_ID'),
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
    obraId: number().key().savedAs('OBRA_ID'),
    profesionalId: number().key().savedAs('PROFESIONAL_ID'),
    rol: string().savedAs('ROL')
  })
});
