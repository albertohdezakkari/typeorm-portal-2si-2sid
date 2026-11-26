import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_VIVEROS = new Table({
  name: process.env.TABLA_VIVEROS, documentClient: db,
  partitionKey: { name: 'VIVERO_ID', type: 'number' }
});

export const TABLA_PLANTAS = new Table({
  name: process.env.TABLA_PLANTAS, documentClient: db,
  partitionKey: { name: 'PLANTA_ID', type: 'number' },
  indexes: {
    PorVivero: {
      type: 'global',
      partitionKey: { name: 'VIVERO_ID', type: 'number' },
      sortKey: { name: 'PLANTA_ID', type: 'number' }
    }
  }
});

export const MODELO_VIVERO = new Entity({
  name: 'Vivero', table: TABLA_VIVEROS,
  entityAttribute: false, timestamps: false,
  schema: item({
    viveroId: number().key().savedAs('VIVERO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PLANTA = new Entity({
  name: 'Planta', table: TABLA_PLANTAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    plantaId: number().key().savedAs('PLANTA_ID'),
    nombre: string().savedAs('NOMBRE'),
    alturaCm: number().savedAs('ALTURA_CM'),
    viveroId: number().savedAs('VIVERO_ID')
  })
});
