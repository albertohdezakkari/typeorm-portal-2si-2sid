import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ESTUDIOS = new Table({
  name: process.env.TABLA_ESTUDIOS, documentClient: db,
  partitionKey: { name: 'ESTUDIO_ID', type: 'number' }
});

export const TABLA_ESCENAS = new Table({
  name: process.env.TABLA_ESCENAS, documentClient: db,
  partitionKey: { name: 'ESCENA_ID', type: 'number' },
  indexes: {
    PorEstudio: {
      type: 'global',
      partitionKey: { name: 'ESTUDIO_ID', type: 'number' },
      sortKey: { name: 'ESCENA_ID', type: 'number' }
    }
  }
});

export const MODELO_ESTUDIO = new Entity({
  name: 'Estudio', table: TABLA_ESTUDIOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    estudioId: number().key().savedAs('ESTUDIO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_ESCENA = new Entity({
  name: 'Escena', table: TABLA_ESCENAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    escenaId: number().key().savedAs('ESCENA_ID'),
    nombre: string().savedAs('NOMBRE'),
    duracionSegundos: number().savedAs('DURACION_SEGUNDOS'),
    estudioId: number().savedAs('ESTUDIO_ID')
  })
});
