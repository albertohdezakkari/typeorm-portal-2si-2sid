import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ACTORES = new Table({
  name: process.env.TABLA_ACTORES,
  documentClient: db,
  partitionKey: { name: 'ACTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'ESCENA_ID', type: 'number' },
  sortKey: { name: 'ACTOR_ID', type: 'number' },
  indexes: {
    PorActor: {
      type: 'global',
      partitionKey: { name: 'ACTOR_ID', type: 'number' },
      sortKey: { name: 'ESCENA_ID', type: 'number' }
    }
  }
});

export const MODELO_ACTOR = new Entity({
  name: 'Actor',
  table: TABLA_ACTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    actorId: number().key().savedAs('ACTOR_ID'),
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
    escenaId: number().key().savedAs('ESCENA_ID'),
    actorId: number().key().savedAs('ACTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
