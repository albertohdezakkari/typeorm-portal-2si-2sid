import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_MUSEOS = new Table({
  name: process.env.TABLA_MUSEOS, documentClient: db,
  partitionKey: { name: 'MUSEO_ID', type: 'number' }
});

export const TABLA_PIEZAS = new Table({
  name: process.env.TABLA_PIEZAS, documentClient: db,
  partitionKey: { name: 'PIEZA_ID', type: 'number' },
  indexes: {
    PorMuseo: {
      type: 'global',
      partitionKey: { name: 'MUSEO_ID', type: 'number' },
      sortKey: { name: 'PIEZA_ID', type: 'number' }
    }
  }
});

export const MODELO_MUSEO = new Entity({
  name: 'Museo', table: TABLA_MUSEOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    museoId: number().key().savedAs('MUSEO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PIEZA = new Entity({
  name: 'Pieza', table: TABLA_PIEZAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    piezaId: number().key().savedAs('PIEZA_ID'),
    nombre: string().savedAs('NOMBRE'),
    antiguedadAnios: number().savedAs('ANTIGUEDAD_ANIOS'),
    museoId: number().savedAs('MUSEO_ID')
  })
});
