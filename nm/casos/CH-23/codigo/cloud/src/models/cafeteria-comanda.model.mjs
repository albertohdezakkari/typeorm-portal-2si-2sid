import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_CAFETERIAS = new Table({
  name: process.env.TABLA_CAFETERIAS, documentClient: db,
  partitionKey: { name: 'CAFETERIA_ID', type: 'number' }
});

export const TABLA_COMANDAS = new Table({
  name: process.env.TABLA_COMANDAS, documentClient: db,
  partitionKey: { name: 'COMANDA_ID', type: 'number' },
  indexes: {
    PorCafeteria: {
      type: 'global',
      partitionKey: { name: 'CAFETERIA_ID', type: 'number' },
      sortKey: { name: 'COMANDA_ID', type: 'number' }
    }
  }
});

export const MODELO_CAFETERIA = new Entity({
  name: 'Cafeteria', table: TABLA_CAFETERIAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    cafeteriaId: number().key().savedAs('CAFETERIA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_COMANDA = new Entity({
  name: 'Comanda', table: TABLA_COMANDAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    comandaId: number().key().savedAs('COMANDA_ID'),
    nombre: string().savedAs('NOMBRE'),
    importeCentimos: number().savedAs('IMPORTE_CENTIMOS'),
    cafeteriaId: number().savedAs('CAFETERIA_ID')
  })
});
