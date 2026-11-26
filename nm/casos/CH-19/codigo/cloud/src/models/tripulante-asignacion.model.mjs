import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_TRIPULANTES = new Table({
  name: process.env.TABLA_TRIPULANTES,
  documentClient: db,
  partitionKey: { name: 'TRIPULANTE_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'EMBARCACION_ID', type: 'number' },
  sortKey: { name: 'TRIPULANTE_ID', type: 'number' },
  indexes: {
    PorTripulante: {
      type: 'global',
      partitionKey: { name: 'TRIPULANTE_ID', type: 'number' },
      sortKey: { name: 'EMBARCACION_ID', type: 'number' }
    }
  }
});

export const MODELO_TRIPULANTE = new Entity({
  name: 'Tripulante',
  table: TABLA_TRIPULANTES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    tripulanteId: number().key().savedAs('TRIPULANTE_ID'),
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
    embarcacionId: number().key().savedAs('EMBARCACION_ID'),
    tripulanteId: number().key().savedAs('TRIPULANTE_ID'),
    rol: string().savedAs('ROL')
  })
});
