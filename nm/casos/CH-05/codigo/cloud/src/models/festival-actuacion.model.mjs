import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_FESTIVALES = new Table({
  name: process.env.TABLA_FESTIVALES, documentClient: db,
  partitionKey: { name: 'FESTIVAL_ID', type: 'number' }
});

export const TABLA_ACTUACIONES = new Table({
  name: process.env.TABLA_ACTUACIONES, documentClient: db,
  partitionKey: { name: 'ACTUACION_ID', type: 'number' },
  indexes: {
    PorFestival: {
      type: 'global',
      partitionKey: { name: 'FESTIVAL_ID', type: 'number' },
      sortKey: { name: 'ACTUACION_ID', type: 'number' }
    }
  }
});

export const MODELO_FESTIVAL = new Entity({
  name: 'Festival', table: TABLA_FESTIVALES,
  entityAttribute: false, timestamps: false,
  schema: item({
    festivalId: number().key().savedAs('FESTIVAL_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_ACTUACION = new Entity({
  name: 'Actuacion', table: TABLA_ACTUACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    actuacionId: number().key().savedAs('ACTUACION_ID'),
    nombre: string().savedAs('NOMBRE'),
    duracionMinutos: number().savedAs('DURACION_MINUTOS'),
    festivalId: number().savedAs('FESTIVAL_ID')
  })
});
