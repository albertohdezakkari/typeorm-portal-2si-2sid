import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_AGENCIAS = new Table({
  name: process.env.TABLA_AGENCIAS, documentClient: db,
  partitionKey: { name: 'AGENCIA_ID', type: 'number' }
});

export const TABLA_EXCURSIONES = new Table({
  name: process.env.TABLA_EXCURSIONES, documentClient: db,
  partitionKey: { name: 'EXCURSION_ID', type: 'number' },
  indexes: {
    PorAgencia: {
      type: 'global',
      partitionKey: { name: 'AGENCIA_ID', type: 'number' },
      sortKey: { name: 'EXCURSION_ID', type: 'number' }
    }
  }
});

export const MODELO_AGENCIA = new Entity({
  name: 'Agencia', table: TABLA_AGENCIAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    agenciaId: number().key().savedAs('AGENCIA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_EXCURSION = new Entity({
  name: 'Excursion', table: TABLA_EXCURSIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    excursionId: number().key().savedAs('EXCURSION_ID'),
    nombre: string().savedAs('NOMBRE'),
    duracionHoras: number().savedAs('DURACION_HORAS'),
    agenciaId: number().savedAs('AGENCIA_ID')
  })
});
