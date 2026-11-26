import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ARTISTAS = new Table({
  name: process.env.TABLA_ARTISTAS,
  documentClient: db,
  partitionKey: { name: 'ARTISTA_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'ACTUACION_ID', type: 'number' },
  sortKey: { name: 'ARTISTA_ID', type: 'number' },
  indexes: {
    PorArtista: {
      type: 'global',
      partitionKey: { name: 'ARTISTA_ID', type: 'number' },
      sortKey: { name: 'ACTUACION_ID', type: 'number' }
    }
  }
});

export const MODELO_ARTISTA = new Entity({
  name: 'Artista',
  table: TABLA_ARTISTAS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    artistaId: number().key().savedAs('ARTISTA_ID'),
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
    actuacionId: number().key().savedAs('ACTUACION_ID'),
    artistaId: number().key().savedAs('ARTISTA_ID'),
    rol: string().savedAs('ROL')
  })
});
