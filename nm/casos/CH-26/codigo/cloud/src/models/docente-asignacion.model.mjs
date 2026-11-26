import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_DOCENTES = new Table({
  name: process.env.TABLA_DOCENTES,
  documentClient: db,
  partitionKey: { name: 'DOCENTE_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'AULA_ID', type: 'number' },
  sortKey: { name: 'DOCENTE_ID', type: 'number' },
  indexes: {
    PorDocente: {
      type: 'global',
      partitionKey: { name: 'DOCENTE_ID', type: 'number' },
      sortKey: { name: 'AULA_ID', type: 'number' }
    }
  }
});

export const MODELO_DOCENTE = new Entity({
  name: 'Docente',
  table: TABLA_DOCENTES,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    docenteId: number().key().savedAs('DOCENTE_ID'),
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
    aulaId: number().key().savedAs('AULA_ID'),
    docenteId: number().key().savedAs('DOCENTE_ID'),
    rol: string().savedAs('ROL')
  })
});
