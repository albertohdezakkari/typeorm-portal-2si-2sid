import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_GRANJAS = new Table({
  name: process.env.TABLA_GRANJAS, documentClient: db,
  partitionKey: { name: 'GRANJA_ID', type: 'number' }
});

export const TABLA_COSECHAS = new Table({
  name: process.env.TABLA_COSECHAS, documentClient: db,
  partitionKey: { name: 'COSECHA_ID', type: 'number' },
  indexes: {
    PorGranja: {
      type: 'global',
      partitionKey: { name: 'GRANJA_ID', type: 'number' },
      sortKey: { name: 'COSECHA_ID', type: 'number' }
    }
  }
});

export const MODELO_GRANJA = new Entity({
  name: 'Granja', table: TABLA_GRANJAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    granjaId: number().key().savedAs('GRANJA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_COSECHA = new Entity({
  name: 'Cosecha', table: TABLA_COSECHAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    cosechaId: number().key().savedAs('COSECHA_ID'),
    nombre: string().savedAs('NOMBRE'),
    kilos: number().savedAs('KILOS'),
    granjaId: number().savedAs('GRANJA_ID')
  })
});
