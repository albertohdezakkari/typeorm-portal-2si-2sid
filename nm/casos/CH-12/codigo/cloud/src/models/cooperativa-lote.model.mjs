import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_COOPERATIVAS = new Table({
  name: process.env.TABLA_COOPERATIVAS, documentClient: db,
  partitionKey: { name: 'COOPERATIVA_ID', type: 'number' }
});

export const TABLA_LOTES = new Table({
  name: process.env.TABLA_LOTES, documentClient: db,
  partitionKey: { name: 'LOTE_ID', type: 'number' },
  indexes: {
    PorCooperativa: {
      type: 'global',
      partitionKey: { name: 'COOPERATIVA_ID', type: 'number' },
      sortKey: { name: 'LOTE_ID', type: 'number' }
    }
  }
});

export const MODELO_COOPERATIVA = new Entity({
  name: 'Cooperativa', table: TABLA_COOPERATIVAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    cooperativaId: number().key().savedAs('COOPERATIVA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_LOTE = new Entity({
  name: 'Lote', table: TABLA_LOTES,
  entityAttribute: false, timestamps: false,
  schema: item({
    loteId: number().key().savedAs('LOTE_ID'),
    nombre: string().savedAs('NOMBRE'),
    kilos: number().savedAs('KILOS'),
    cooperativaId: number().savedAs('COOPERATIVA_ID')
  })
});
