import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_VENDEDORES = new Table({
  name: process.env.TABLA_VENDEDORES,
  documentClient: db,
  partitionKey: { name: 'VENDEDOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'ARTICULO_ID', type: 'number' },
  sortKey: { name: 'VENDEDOR_ID', type: 'number' },
  indexes: {
    PorVendedor: {
      type: 'global',
      partitionKey: { name: 'VENDEDOR_ID', type: 'number' },
      sortKey: { name: 'ARTICULO_ID', type: 'number' }
    }
  }
});

export const MODELO_VENDEDOR = new Entity({
  name: 'Vendedor',
  table: TABLA_VENDEDORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    vendedorId: number().key().savedAs('VENDEDOR_ID'),
    nombre: string().savedAs('NOMBRE'),
    apellidos: string().savedAs('APELLIDOS'),
    email: string().savedAs('EMAIL')
  })
});

export const MODELO_ASIGNACION = new Entity({
  name: 'Asignacion',
  table: TABLA_ASIGNACIONES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    articuloId: number().key().savedAs('ARTICULO_ID'),
    vendedorId: number().key().savedAs('VENDEDOR_ID'),
    rol: string().savedAs('ROL')
  })
});
