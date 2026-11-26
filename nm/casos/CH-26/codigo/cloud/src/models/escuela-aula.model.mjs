import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ESCUELAS = new Table({
  name: process.env.TABLA_ESCUELAS, documentClient: db,
  partitionKey: { name: 'ESCUELA_ID', type: 'number' }
});

export const TABLA_AULAS = new Table({
  name: process.env.TABLA_AULAS, documentClient: db,
  partitionKey: { name: 'AULA_ID', type: 'number' },
  indexes: {
    PorEscuela: {
      type: 'global',
      partitionKey: { name: 'ESCUELA_ID', type: 'number' },
      sortKey: { name: 'AULA_ID', type: 'number' }
    }
  }
});

export const MODELO_ESCUELA = new Entity({
  name: 'Escuela', table: TABLA_ESCUELAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    escuelaId: number().key().savedAs('ESCUELA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_AULA = new Entity({
  name: 'Aula', table: TABLA_AULAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    aulaId: number().key().savedAs('AULA_ID'),
    nombre: string().savedAs('NOMBRE'),
    capacidad: number().savedAs('CAPACIDAD'),
    escuelaId: number().savedAs('ESCUELA_ID')
  })
});
