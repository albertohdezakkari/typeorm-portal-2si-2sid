import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_HOSPITALES = new Table({
  name: process.env.TABLA_HOSPITALES, documentClient: db,
  partitionKey: { name: 'HOSPITAL_ID', type: 'number' }
});

export const TABLA_HABITACIONES = new Table({
  name: process.env.TABLA_HABITACIONES, documentClient: db,
  partitionKey: { name: 'HABITACION_ID', type: 'number' },
  indexes: {
    PorHospital: {
      type: 'global',
      partitionKey: { name: 'HOSPITAL_ID', type: 'number' },
      sortKey: { name: 'HABITACION_ID', type: 'number' }
    }
  }
});

export const MODELO_HOSPITAL = new Entity({
  name: 'Hospital', table: TABLA_HOSPITALES,
  entityAttribute: false, timestamps: false,
  schema: item({
    hospitalId: number().key().savedAs('HOSPITAL_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_HABITACION = new Entity({
  name: 'Habitacion', table: TABLA_HABITACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    habitacionId: number().key().savedAs('HABITACION_ID'),
    nombre: string().savedAs('NOMBRE'),
    camas: number().savedAs('CAMAS'),
    hospitalId: number().savedAs('HOSPITAL_ID')
  })
});
