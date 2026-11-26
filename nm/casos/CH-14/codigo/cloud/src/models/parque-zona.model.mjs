import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_PARQUES = new Table({
  name: process.env.TABLA_PARQUES, documentClient: db,
  partitionKey: { name: 'PARQUE_ID', type: 'number' }
});

export const TABLA_ZONAS = new Table({
  name: process.env.TABLA_ZONAS, documentClient: db,
  partitionKey: { name: 'ZONA_ID', type: 'number' },
  indexes: {
    PorParque: {
      type: 'global',
      partitionKey: { name: 'PARQUE_ID', type: 'number' },
      sortKey: { name: 'ZONA_ID', type: 'number' }
    }
  }
});

export const MODELO_PARQUE = new Entity({
  name: 'Parque', table: TABLA_PARQUES,
  entityAttribute: false, timestamps: false,
  schema: item({
    parqueId: number().key().savedAs('PARQUE_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_ZONA = new Entity({
  name: 'Zona', table: TABLA_ZONAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    zonaId: number().key().savedAs('ZONA_ID'),
    nombre: string().savedAs('NOMBRE'),
    capacidad: number().savedAs('CAPACIDAD'),
    parqueId: number().savedAs('PARQUE_ID')
  })
});
