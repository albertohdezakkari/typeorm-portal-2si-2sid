import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_HUERTOS = new Table({
  name: process.env.TABLA_HUERTOS, documentClient: db,
  partitionKey: { name: 'HUERTO_ID', type: 'number' }
});

export const TABLA_PARCELAS = new Table({
  name: process.env.TABLA_PARCELAS, documentClient: db,
  partitionKey: { name: 'PARCELA_ID', type: 'number' },
  indexes: {
    PorHuerto: {
      type: 'global',
      partitionKey: { name: 'HUERTO_ID', type: 'number' },
      sortKey: { name: 'PARCELA_ID', type: 'number' }
    }
  }
});

export const MODELO_HUERTO = new Entity({
  name: 'Huerto', table: TABLA_HUERTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    huertoId: number().key().savedAs('HUERTO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PARCELA = new Entity({
  name: 'Parcela', table: TABLA_PARCELAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    parcelaId: number().key().savedAs('PARCELA_ID'),
    nombre: string().savedAs('NOMBRE'),
    superficieM2: number().savedAs('SUPERFICIE_M2'),
    huertoId: number().savedAs('HUERTO_ID')
  })
});
