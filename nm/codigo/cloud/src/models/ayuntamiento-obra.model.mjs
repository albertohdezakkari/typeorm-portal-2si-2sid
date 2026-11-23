import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_AYUNTAMIENTOS = new Table({
  name: process.env.TABLA_AYUNTAMIENTOS, documentClient: db,
  partitionKey: { name: 'AYUNTAMIENTO_ID', type: 'number' }
});

export const TABLA_OBRAS = new Table({
  name: process.env.TABLA_OBRAS, documentClient: db,
  partitionKey: { name: 'OBRA_ID', type: 'number' },
  indexes: {
    PorAyuntamiento: {
      type: 'global',
      partitionKey: { name: 'AYUNTAMIENTO_ID', type: 'number' },
      sortKey: { name: 'OBRA_ID', type: 'number' }
    }
  }
});

export const MODELO_AYUNTAMIENTO = new Entity({
  name: 'Ayuntamiento', table: TABLA_AYUNTAMIENTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    ayuntamientoId: number().key().savedAs('AYUNTAMIENTO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_OBRA = new Entity({
  name: 'Obra', table: TABLA_OBRAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    obraId: number().key().savedAs('OBRA_ID'),
    nombre: string().savedAs('NOMBRE'),
    presupuestoEuros: number().savedAs('PRESUPUESTO_EUROS'),
    ayuntamientoId: number().savedAs('AYUNTAMIENTO_ID')
  })
});
