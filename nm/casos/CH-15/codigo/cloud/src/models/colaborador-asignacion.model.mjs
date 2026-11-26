import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_COLABORADORES = new Table({
  name: process.env.TABLA_COLABORADORES,
  documentClient: db,
  partitionKey: { name: 'COLABORADOR_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PROYECTO_ID', type: 'number' },
  sortKey: { name: 'COLABORADOR_ID', type: 'number' },
  indexes: {
    PorColaborador: {
      type: 'global',
      partitionKey: { name: 'COLABORADOR_ID', type: 'number' },
      sortKey: { name: 'PROYECTO_ID', type: 'number' }
    }
  }
});

export const MODELO_COLABORADOR = new Entity({
  name: 'Colaborador',
  table: TABLA_COLABORADORES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    colaboradorId: number().key().savedAs('COLABORADOR_ID'),
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
    proyectoId: number().key().savedAs('PROYECTO_ID'),
    colaboradorId: number().key().savedAs('COLABORADOR_ID'),
    rol: string().savedAs('ROL')
  })
});
