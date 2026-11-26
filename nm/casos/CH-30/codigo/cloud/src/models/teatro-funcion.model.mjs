import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_TEATROS = new Table({
  name: process.env.TABLA_TEATROS, documentClient: db,
  partitionKey: { name: 'TEATRO_ID', type: 'number' }
});

export const TABLA_FUNCIONES = new Table({
  name: process.env.TABLA_FUNCIONES, documentClient: db,
  partitionKey: { name: 'FUNCION_ID', type: 'number' },
  indexes: {
    PorTeatro: {
      type: 'global',
      partitionKey: { name: 'TEATRO_ID', type: 'number' },
      sortKey: { name: 'FUNCION_ID', type: 'number' }
    }
  }
});

export const MODELO_TEATRO = new Entity({
  name: 'Teatro', table: TABLA_TEATROS,
  entityAttribute: false, timestamps: false,
  schema: item({
    teatroId: number().key().savedAs('TEATRO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_FUNCION = new Entity({
  name: 'Funcion', table: TABLA_FUNCIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    funcionId: number().key().savedAs('FUNCION_ID'),
    nombre: string().savedAs('NOMBRE'),
    aforo: number().savedAs('AFORO'),
    teatroId: number().savedAs('TEATRO_ID')
  })
});
