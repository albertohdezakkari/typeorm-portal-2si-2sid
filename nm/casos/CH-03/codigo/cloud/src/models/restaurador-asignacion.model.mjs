import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_RESTAURADORES = new Table({
  name: process.env.TABLA_RESTAURADORES,
  documentClient: db,
  partitionKey: { name: 'RESTAURADOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PIEZA_ID', type: 'number' },
  sortKey: { name: 'RESTAURADOR_ID', type: 'number' },
  indexes: {
    PorRestaurador: {
      type: 'global',
      partitionKey: { name: 'RESTAURADOR_ID', type: 'number' },
      sortKey: { name: 'PIEZA_ID', type: 'number' }
    }
  }
});

export const MODELO_RESTAURADOR = new Entity({
  name: 'Restaurador',
  table: TABLA_RESTAURADORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    restauradorId: number().key().savedAs('RESTAURADOR_ID'),
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
    piezaId: number().key().savedAs('PIEZA_ID'),
    restauradorId: number().key().savedAs('RESTAURADOR_ID'),
    rol: string().savedAs('ROL')
  })
});
