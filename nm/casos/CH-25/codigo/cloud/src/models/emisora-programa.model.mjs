import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_EMISORAS = new Table({
  name: process.env.TABLA_EMISORAS, documentClient: db,
  partitionKey: { name: 'EMISORA_ID', type: 'number' }
});

export const TABLA_PROGRAMAS = new Table({
  name: process.env.TABLA_PROGRAMAS, documentClient: db,
  partitionKey: { name: 'PROGRAMA_ID', type: 'number' },
  indexes: {
    PorEmisora: {
      type: 'global',
      partitionKey: { name: 'EMISORA_ID', type: 'number' },
      sortKey: { name: 'PROGRAMA_ID', type: 'number' }
    }
  }
});

export const MODELO_EMISORA = new Entity({
  name: 'Emisora', table: TABLA_EMISORAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    emisoraId: number().key().savedAs('EMISORA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PROGRAMA = new Entity({
  name: 'Programa', table: TABLA_PROGRAMAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    programaId: number().key().savedAs('PROGRAMA_ID'),
    nombre: string().savedAs('NOMBRE'),
    duracionMinutos: number().savedAs('DURACION_MINUTOS'),
    emisoraId: number().savedAs('EMISORA_ID')
  })
});
