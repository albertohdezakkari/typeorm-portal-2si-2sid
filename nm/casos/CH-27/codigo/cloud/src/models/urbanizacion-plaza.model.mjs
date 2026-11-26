import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_URBANIZACIONES = new Table({
  name: process.env.TABLA_URBANIZACIONES, documentClient: db,
  partitionKey: { name: 'URBANIZACION_ID', type: 'number' }
});

export const TABLA_PLAZAS = new Table({
  name: process.env.TABLA_PLAZAS, documentClient: db,
  partitionKey: { name: 'PLAZA_ID', type: 'number' },
  indexes: {
    PorUrbanizacion: {
      type: 'global',
      partitionKey: { name: 'URBANIZACION_ID', type: 'number' },
      sortKey: { name: 'PLAZA_ID', type: 'number' }
    }
  }
});

export const MODELO_URBANIZACION = new Entity({
  name: 'Urbanizacion', table: TABLA_URBANIZACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    urbanizacionId: number().key().savedAs('URBANIZACION_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PLAZA = new Entity({
  name: 'Plaza', table: TABLA_PLAZAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    plazaId: number().key().savedAs('PLAZA_ID'),
    nombre: string().savedAs('NOMBRE'),
    superficieM2: number().savedAs('SUPERFICIE_M2'),
    urbanizacionId: number().savedAs('URBANIZACION_ID')
  })
});
