import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_TALLERES = new Table({
  name: process.env.TABLA_TALLERES, documentClient: db,
  partitionKey: { name: 'TALLER_ID', type: 'number' }
});

export const TABLA_REPARACIONES = new Table({
  name: process.env.TABLA_REPARACIONES, documentClient: db,
  partitionKey: { name: 'REPARACION_ID', type: 'number' },
  indexes: {
    PorTaller: {
      type: 'global',
      partitionKey: { name: 'TALLER_ID', type: 'number' },
      sortKey: { name: 'REPARACION_ID', type: 'number' }
    }
  }
});

export const MODELO_TALLER = new Entity({
  name: 'Taller', table: TABLA_TALLERES,
  entityAttribute: false, timestamps: false,
  schema: item({
    tallerId: number().key().savedAs('TALLER_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_REPARACION = new Entity({
  name: 'Reparacion', table: TABLA_REPARACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    reparacionId: number().key().savedAs('REPARACION_ID'),
    nombre: string().savedAs('NOMBRE'),
    costeCentimos: number().savedAs('COSTE_CENTIMOS'),
    tallerId: number().savedAs('TALLER_ID')
  })
});
