import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ENTRENADORES = new Table({
  name: process.env.TABLA_ENTRENADORES,
  documentClient: db,
  partitionKey: { name: 'ENTRENADOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PISTA_ID', type: 'number' },
  sortKey: { name: 'ENTRENADOR_ID', type: 'number' },
  indexes: {
    PorEntrenador: {
      type: 'global',
      partitionKey: { name: 'ENTRENADOR_ID', type: 'number' },
      sortKey: { name: 'PISTA_ID', type: 'number' }
    }
  }
});

export const MODELO_ENTRENADOR = new Entity({
  name: 'Entrenador',
  table: TABLA_ENTRENADORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    entrenadorId: number().key().savedAs('ENTRENADOR_ID'),
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
    pistaId: number().key().savedAs('PISTA_ID'),
    entrenadorId: number().key().savedAs('ENTRENADOR_ID'),
    rol: string().savedAs('ROL')
  })
});
