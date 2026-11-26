import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_EMPRESAS = new Table({
  name: process.env.TABLA_EMPRESAS, documentClient: db,
  partitionKey: { name: 'EMPRESA_ID', type: 'number' }
});

export const TABLA_PROYECTOS = new Table({
  name: process.env.TABLA_PROYECTOS, documentClient: db,
  partitionKey: { name: 'PROYECTO_ID', type: 'number' },
  indexes: {
    PorEmpresa: {
      type: 'global',
      partitionKey: { name: 'EMPRESA_ID', type: 'number' },
      sortKey: { name: 'PROYECTO_ID', type: 'number' }
    }
  }
});

export const MODELO_EMPRESA = new Entity({
  name: 'Empresa', table: TABLA_EMPRESAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    empresaId: number().key().savedAs('EMPRESA_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_PROYECTO = new Entity({
  name: 'Proyecto', table: TABLA_PROYECTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    proyectoId: number().key().savedAs('PROYECTO_ID'),
    nombre: string().savedAs('NOMBRE'),
    horasEstimadas: number().savedAs('HORAS_ESTIMADAS'),
    empresaId: number().savedAs('EMPRESA_ID')
  })
});
