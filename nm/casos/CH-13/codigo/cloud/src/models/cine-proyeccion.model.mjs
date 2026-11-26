import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_CINES = new Table({
  name: process.env.TABLA_CINES, documentClient: db,
  partitionKey: { name: 'CINE_ID', type: 'number' }
});

export const TABLA_PROYECCIONES = new Table({
  name: process.env.TABLA_PROYECCIONES, documentClient: db,
  partitionKey: { name: 'PROYECCION_ID', type: 'number' },
  indexes: {
    PorCine: {
      type: 'global',
      partitionKey: { name: 'CINE_ID', type: 'number' },
      sortKey: { name: 'PROYECCION_ID', type: 'number' }
    }
  }
});

export const MODELO_CINE = new Entity({
  name: 'Cine', table: TABLA_CINES,
  entityAttribute: false, timestamps: false,
  schema: item({
    cineId: number().key().savedAs('CINE_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PROYECCION = new Entity({
  name: 'Proyeccion', table: TABLA_PROYECCIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    proyeccionId: number().key().savedAs('PROYECCION_ID'),
    pelicula: string().savedAs('PELICULA'),
    duracionMinutos: number().savedAs('DURACION_MINUTOS'),
    cineId: number().savedAs('CINE_ID')
  })
});
