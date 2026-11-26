import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ESTACIONES = new Table({
  name: process.env.TABLA_ESTACIONES, documentClient: db,
  partitionKey: { name: 'ESTACION_ID', type: 'number' }
});

export const TABLA_TRAYECTOS = new Table({
  name: process.env.TABLA_TRAYECTOS, documentClient: db,
  partitionKey: { name: 'TRAYECTO_ID', type: 'number' },
  indexes: {
    PorEstacion: {
      type: 'global',
      partitionKey: { name: 'ESTACION_ID', type: 'number' },
      sortKey: { name: 'TRAYECTO_ID', type: 'number' }
    }
  }
});

export const MODELO_ESTACION = new Entity({
  name: 'Estacion', table: TABLA_ESTACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    estacionId: number().key().savedAs('ESTACION_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_TRAYECTO = new Entity({
  name: 'Trayecto', table: TABLA_TRAYECTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    trayectoId: number().key().savedAs('TRAYECTO_ID'),
    nombre: string().savedAs('NOMBRE'),
    distanciaKm: number().savedAs('DISTANCIA_KM'),
    estacionId: number().savedAs('ESTACION_ID')
  })
});
