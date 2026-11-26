import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_PUERTOS = new Table({
  name: process.env.TABLA_PUERTOS, documentClient: db,
  partitionKey: { name: 'PUERTO_ID', type: 'number' }
});

export const TABLA_EMBARCACIONES = new Table({
  name: process.env.TABLA_EMBARCACIONES, documentClient: db,
  partitionKey: { name: 'EMBARCACION_ID', type: 'number' },
  indexes: {
    PorPuerto: {
      type: 'global',
      partitionKey: { name: 'PUERTO_ID', type: 'number' },
      sortKey: { name: 'EMBARCACION_ID', type: 'number' }
    }
  }
});

export const MODELO_PUERTO = new Entity({
  name: 'Puerto', table: TABLA_PUERTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    puertoId: number().key().savedAs('PUERTO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_EMBARCACION = new Entity({
  name: 'Embarcacion', table: TABLA_EMBARCACIONES,
  entityAttribute: false, timestamps: false,
  schema: item({
    embarcacionId: number().key().savedAs('EMBARCACION_ID'),
    nombre: string().savedAs('NOMBRE'),
    esloraMetros: number().savedAs('ESLORA_METROS'),
    puertoId: number().savedAs('PUERTO_ID')
  })
});
