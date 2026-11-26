import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_REFUGIOS = new Table({
  name: process.env.TABLA_REFUGIOS, documentClient: db,
  partitionKey: { name: 'REFUGIO_ID', type: 'number' }
});

export const TABLA_ANIMALES = new Table({
  name: process.env.TABLA_ANIMALES, documentClient: db,
  partitionKey: { name: 'ANIMAL_ID', type: 'number' },
  indexes: {
    PorRefugio: {
      type: 'global',
      partitionKey: { name: 'REFUGIO_ID', type: 'number' },
      sortKey: { name: 'ANIMAL_ID', type: 'number' }
    }
  }
});

export const MODELO_REFUGIO = new Entity({
  name: 'Refugio', table: TABLA_REFUGIOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    refugioId: number().key().savedAs('REFUGIO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_ANIMAL = new Entity({
  name: 'Animal', table: TABLA_ANIMALES,
  entityAttribute: false, timestamps: false,
  schema: item({
    animalId: number().key().savedAs('ANIMAL_ID'),
    nombre: string().savedAs('NOMBRE'),
    edadMeses: number().savedAs('EDAD_MESES'),
    refugioId: number().savedAs('REFUGIO_ID')
  })
});
