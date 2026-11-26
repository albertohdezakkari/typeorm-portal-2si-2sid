import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_CULTIVADORES = new Table({
  name: process.env.TABLA_CULTIVADORES,
  documentClient: db,
  partitionKey: { name: 'CULTIVADOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PARCELA_ID', type: 'number' },
  sortKey: { name: 'CULTIVADOR_ID', type: 'number' },
  indexes: {
    PorCultivador: {
      type: 'global',
      partitionKey: { name: 'CULTIVADOR_ID', type: 'number' },
      sortKey: { name: 'PARCELA_ID', type: 'number' }
    }
  }
});

export const MODELO_CULTIVADOR = new Entity({
  name: 'Cultivador',
  table: TABLA_CULTIVADORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    cultivadorId: number().key().savedAs('CULTIVADOR_ID'),
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
    parcelaId: number().key().savedAs('PARCELA_ID'),
    cultivadorId: number().key().savedAs('CULTIVADOR_ID'),
    rol: string().savedAs('ROL')
  })
});
