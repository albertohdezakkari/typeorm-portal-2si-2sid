import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_COMPLEJOS = new Table({
  name: process.env.TABLA_COMPLEJOS, documentClient: db,
  partitionKey: { name: 'COMPLEJO_ID', type: 'number' }
});

export const TABLA_PISTAS = new Table({
  name: process.env.TABLA_PISTAS, documentClient: db,
  partitionKey: { name: 'PISTA_ID', type: 'number' },
  indexes: {
    PorComplejo: {
      type: 'global',
      partitionKey: { name: 'COMPLEJO_ID', type: 'number' },
      sortKey: { name: 'PISTA_ID', type: 'number' }
    }
  }
});

export const MODELO_COMPLEJO = new Entity({
  name: 'Complejo', table: TABLA_COMPLEJOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    complejoId: number().key().savedAs('COMPLEJO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PISTA = new Entity({
  name: 'Pista', table: TABLA_PISTAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    pistaId: number().key().savedAs('PISTA_ID'),
    nombre: string().savedAs('NOMBRE'),
    superficieM2: number().savedAs('SUPERFICIE_M2'),
    complejoId: number().savedAs('COMPLEJO_ID')
  })
});
