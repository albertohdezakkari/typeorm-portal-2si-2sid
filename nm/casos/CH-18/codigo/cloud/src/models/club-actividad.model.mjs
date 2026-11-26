import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_CLUBES = new Table({
  name: process.env.TABLA_CLUBES, documentClient: db,
  partitionKey: { name: 'CLUB_ID', type: 'number' }
});

export const TABLA_ACTIVIDADES = new Table({
  name: process.env.TABLA_ACTIVIDADES, documentClient: db,
  partitionKey: { name: 'ACTIVIDAD_ID', type: 'number' },
  indexes: {
    PorClub: {
      type: 'global',
      partitionKey: { name: 'CLUB_ID', type: 'number' },
      sortKey: { name: 'ACTIVIDAD_ID', type: 'number' }
    }
  }
});

export const MODELO_CLUB = new Entity({
  name: 'Club', table: TABLA_CLUBES,
  entityAttribute: false, timestamps: false,
  schema: item({
    clubId: number().key().savedAs('CLUB_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_ACTIVIDAD = new Entity({
  name: 'Actividad', table: TABLA_ACTIVIDADES,
  entityAttribute: false, timestamps: false,
  schema: item({
    actividadId: number().key().savedAs('ACTIVIDAD_ID'),
    nombre: string().savedAs('NOMBRE'),
    plazas: number().savedAs('PLAZAS'),
    clubId: number().savedAs('CLUB_ID')
  })
});
