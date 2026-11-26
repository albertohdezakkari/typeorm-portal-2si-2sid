import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_LABORATORIOS = new Table({
  name: process.env.TABLA_LABORATORIOS, documentClient: db,
  partitionKey: { name: 'LABORATORIO_ID', type: 'number' }
});

export const TABLA_MUESTRAS = new Table({
  name: process.env.TABLA_MUESTRAS, documentClient: db,
  partitionKey: { name: 'MUESTRA_ID', type: 'number' },
  indexes: {
    PorLaboratorio: {
      type: 'global',
      partitionKey: { name: 'LABORATORIO_ID', type: 'number' },
      sortKey: { name: 'MUESTRA_ID', type: 'number' }
    }
  }
});

export const MODELO_LABORATORIO = new Entity({
  name: 'Laboratorio', table: TABLA_LABORATORIOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    laboratorioId: number().key().savedAs('LABORATORIO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_MUESTRA = new Entity({
  name: 'Muestra', table: TABLA_MUESTRAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    muestraId: number().key().savedAs('MUESTRA_ID'),
    nombre: string().savedAs('NOMBRE'),
    cantidadMl: number().savedAs('CANTIDAD_ML'),
    laboratorioId: number().savedAs('LABORATORIO_ID')
  })
});
