import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_EDITORIALES = new Table({
  name: process.env.TABLA_EDITORIALES, documentClient: db,
  partitionKey: { name: 'EDITORIAL_ID', type: 'number' }
});

export const TABLA_PUBLICACIONES = new Table({
  name: process.env.TABLA_PUBLICACIONES, documentClient: db,
  partitionKey: { name: 'PUBLICACION_ID', type: 'number' },
  indexes: {
    PorEditorial: {
      type: 'global',
      partitionKey: { name: 'EDITORIAL_ID', type: 'number' },
      sortKey: { name: 'PUBLICACION_ID', type: 'number' }
    }
  }
});

export const MODELO_EDITORIAL = new Entity({
  name: 'Editorial', table: TABLA_EDITORIALES,
  entityAttribute: false, timestamps: false,
  schema: item({
    editorialId: number().key().savedAs('EDITORIAL_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PUBLICACION = new Entity({
  name: 'Publicacion', table: TABLA_PUBLICACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    publicacionId: number().key().savedAs('PUBLICACION_ID'),
    nombre: string().savedAs('NOMBRE'),
    paginas: number().savedAs('PAGINAS'),
    editorialId: number().savedAs('EDITORIAL_ID')
  })
});
