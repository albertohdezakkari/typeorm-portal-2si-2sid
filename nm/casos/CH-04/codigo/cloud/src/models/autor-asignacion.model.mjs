import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_AUTORES = new Table({
  name: process.env.TABLA_AUTORES,
  documentClient: db,
  partitionKey: { name: 'AUTOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PUBLICACION_ID', type: 'number' },
  sortKey: { name: 'AUTOR_ID', type: 'number' },
  indexes: {
    PorAutor: {
      type: 'global',
      partitionKey: { name: 'AUTOR_ID', type: 'number' },
      sortKey: { name: 'PUBLICACION_ID', type: 'number' }
    }
  }
});

export const MODELO_AUTOR = new Entity({
  name: 'Autor',
  table: TABLA_AUTORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    autorId: number().key().savedAs('AUTOR_ID'),
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
    publicacionId: number().key().savedAs('PUBLICACION_ID'),
    autorId: number().key().savedAs('AUTOR_ID'),
    rol: string().savedAs('ROL')
  })
});
