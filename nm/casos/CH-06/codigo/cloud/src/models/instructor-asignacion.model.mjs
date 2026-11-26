import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_INSTRUCTORES = new Table({
  name: process.env.TABLA_INSTRUCTORES,
  documentClient: db,
  partitionKey: { name: 'INSTRUCTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'SESION_ID', type: 'number' },
  sortKey: { name: 'INSTRUCTOR_ID', type: 'number' },
  indexes: {
    PorInstructor: {
      type: 'global',
      partitionKey: { name: 'INSTRUCTOR_ID', type: 'number' },
      sortKey: { name: 'SESION_ID', type: 'number' }
    }
  }
});

export const MODELO_INSTRUCTOR = new Entity({
  name: 'Instructor',
  table: TABLA_INSTRUCTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    instructorId: number().key().savedAs('INSTRUCTOR_ID'),
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
    sesionId: number().key().savedAs('SESION_ID'),
    instructorId: number().key().savedAs('INSTRUCTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
