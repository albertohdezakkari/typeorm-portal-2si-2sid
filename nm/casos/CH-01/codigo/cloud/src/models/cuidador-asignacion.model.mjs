import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_CUIDADORES = new Table({
  name: process.env.TABLA_CUIDADORES,
  documentClient: db,
  partitionKey: { name: 'CUIDADOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'ANIMAL_ID', type: 'number' },
  sortKey: { name: 'CUIDADOR_ID', type: 'number' },
  indexes: {
    PorCuidador: {
      type: 'global',
      partitionKey: { name: 'CUIDADOR_ID', type: 'number' },
      sortKey: { name: 'ANIMAL_ID', type: 'number' }
    }
  }
});

export const MODELO_CUIDADOR = new Entity({
  name: 'Cuidador',
  table: TABLA_CUIDADORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    cuidadorId: number().key().savedAs('CUIDADOR_ID'),
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
    animalId: number().key().savedAs('ANIMAL_ID'),
    cuidadorId: number().key().savedAs('CUIDADOR_ID'),
    rol: string().savedAs('ROL')
  })
});
