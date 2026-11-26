import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_LOCUTORES = new Table({
  name: process.env.TABLA_LOCUTORES,
  documentClient: db,
  partitionKey: { name: 'LOCUTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PROGRAMA_ID', type: 'number' },
  sortKey: { name: 'LOCUTOR_ID', type: 'number' },
  indexes: {
    PorLocutor: {
      type: 'global',
      partitionKey: { name: 'LOCUTOR_ID', type: 'number' },
      sortKey: { name: 'PROGRAMA_ID', type: 'number' }
    }
  }
});

export const MODELO_LOCUTOR = new Entity({
  name: 'Locutor',
  table: TABLA_LOCUTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    locutorId: number().key().savedAs('LOCUTOR_ID'),
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
    programaId: number().key().savedAs('PROGRAMA_ID'),
    locutorId: number().key().savedAs('LOCUTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
