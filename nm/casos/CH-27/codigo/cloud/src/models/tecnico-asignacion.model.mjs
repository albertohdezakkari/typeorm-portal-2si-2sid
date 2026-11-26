import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_TECNICOS = new Table({
  name: process.env.TABLA_TECNICOS,
  documentClient: db,
  partitionKey: { name: 'TECNICO_ID', type: 'number' }
});

export const TABLA_ASIGNACIONES = new Table({
  name: process.env.TABLA_ASIGNACIONES,
  documentClient: db,
  partitionKey: { name: 'PLAZA_ID', type: 'number' },
  sortKey: { name: 'TECNICO_ID', type: 'number' },
  indexes: {
    PorTecnico: {
      type: 'global',
      partitionKey: { name: 'TECNICO_ID', type: 'number' },
      sortKey: { name: 'PLAZA_ID', type: 'number' }
    }
  }
});

export const MODELO_TECNICO = new Entity({
  name: 'Tecnico',
  table: TABLA_TECNICOS,
  entityAttribute: false,
  timestamps: false,
  schema: item({
    tecnicoId: number().key().savedAs('TECNICO_ID'),
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
    plazaId: number().key().savedAs('PLAZA_ID'),
    tecnicoId: number().key().savedAs('TECNICO_ID'),
    rol: string().savedAs('ROL')
  })
});
