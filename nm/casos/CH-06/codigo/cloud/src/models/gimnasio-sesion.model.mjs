import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_GIMNASIOS = new Table({
  name: process.env.TABLA_GIMNASIOS, documentClient: db,
  partitionKey: { name: 'GIMNASIO_ID', type: 'number' }
});

export const TABLA_SESIONES = new Table({
  name: process.env.TABLA_SESIONES, documentClient: db,
  partitionKey: { name: 'SESION_ID', type: 'number' },
  indexes: {
    PorGimnasio: {
      type: 'global',
      partitionKey: { name: 'GIMNASIO_ID', type: 'number' },
      sortKey: { name: 'SESION_ID', type: 'number' }
    }
  }
});

export const MODELO_GIMNASIO = new Entity({
  name: 'Gimnasio', table: TABLA_GIMNASIOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    gimnasioId: number().key().savedAs('GIMNASIO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_SESION = new Entity({
  name: 'Sesion', table: TABLA_SESIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    sesionId: number().key().savedAs('SESION_ID'),
    nombre: string().savedAs('NOMBRE'),
    plazas: number().savedAs('PLAZAS'),
    gimnasioId: number().savedAs('GIMNASIO_ID')
  })
});
