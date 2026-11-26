import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_PANADERIAS = new Table({
  name: process.env.TABLA_PANADERIAS, documentClient: db,
  partitionKey: { name: 'PANADERIA_ID', type: 'number' }
});

export const TABLA_PRODUCTOS = new Table({
  name: process.env.TABLA_PRODUCTOS, documentClient: db,
  partitionKey: { name: 'PRODUCTO_ID', type: 'number' },
  indexes: {
    PorPanaderia: {
      type: 'global',
      partitionKey: { name: 'PANADERIA_ID', type: 'number' },
      sortKey: { name: 'PRODUCTO_ID', type: 'number' }
    }
  }
});

export const MODELO_PANADERIA = new Entity({
  name: 'Panaderia', table: TABLA_PANADERIAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    panaderiaId: number().key().savedAs('PANADERIA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PRODUCTO = new Entity({
  name: 'Producto', table: TABLA_PRODUCTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    productoId: number().key().savedAs('PRODUCTO_ID'),
    nombre: string().savedAs('NOMBRE'),
    precioCentimos: number().savedAs('PRECIO_CENTIMOS'),
    panaderiaId: number().savedAs('PANADERIA_ID')
  })
});
