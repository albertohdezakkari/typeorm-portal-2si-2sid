import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_ARCHIVOS = new Table({
  name: process.env.TABLA_ARCHIVOS, documentClient: db,
  partitionKey: { name: 'ARCHIVO_ID', type: 'number' }
});

export const TABLA_DOCUMENTOS = new Table({
  name: process.env.TABLA_DOCUMENTOS, documentClient: db,
  partitionKey: { name: 'DOCUMENTO_ID', type: 'number' },
  indexes: {
    PorArchivo: {
      type: 'global',
      partitionKey: { name: 'ARCHIVO_ID', type: 'number' },
      sortKey: { name: 'DOCUMENTO_ID', type: 'number' }
    }
  }
});

export const MODELO_ARCHIVO = new Entity({
  name: 'Archivo', table: TABLA_ARCHIVOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    archivoId: number().key().savedAs('ARCHIVO_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_DOCUMENTO = new Entity({
  name: 'Documento', table: TABLA_DOCUMENTOS,
  entityAttribute: false, timestamps: false,
  schema: item({
    documentoId: number().key().savedAs('DOCUMENTO_ID'),
    nombre: string().savedAs('NOMBRE'),
    paginas: number().savedAs('PAGINAS'),
    archivoId: number().savedAs('ARCHIVO_ID')
  })
});
