import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_TIENDAS = new Table({
  name: process.env.TABLA_TIENDAS, documentClient: db,
  partitionKey: { name: 'TIENDA_ID', type: 'number' }
});

export const TABLA_ARTICULOS = new Table({
  name: process.env.TABLA_ARTICULOS, documentClient: db,
  partitionKey: { name: 'ARTICULO_ID', type: 'number' },
  indexes: {
    PorTienda: {
      type: 'global',
      partitionKey: { name: 'TIENDA_ID', type: 'number' },
      sortKey: { name: 'ARTICULO_ID', type: 'number' }
    }
  }
});

export const MODELO_TIENDA = new Entity({
  name: 'Tienda', table: TABLA_TIENDAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    tiendaId: number().key().savedAs('TIENDA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_ARTICULO = new Entity({
  name: 'Articulo', table: TABLA_ARTICULOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    articuloId: number().key().savedAs('ARTICULO_ID'),
    nombre: string().savedAs('NOMBRE'),
    stock: number().savedAs('STOCK'),
    tiendaId: number().savedAs('TIENDA_ID')
  })
});
