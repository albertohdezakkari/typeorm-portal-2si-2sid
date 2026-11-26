import { Table } from 'dynamodb-toolbox/table';
import { Entity } from 'dynamodb-toolbox/entity';
import { item } from 'dynamodb-toolbox/schema/item';
import { number } from 'dynamodb-toolbox/schema/number';
import { string } from 'dynamodb-toolbox/schema/string';
import { db } from '../datos/dynamo.mjs';

export const TABLA_HOTELES = new Table({
  name: process.env.TABLA_HOTELES, documentClient: db,
  partitionKey: { name: 'HOTEL_ID', type: 'number' }
});

export const TABLA_RESERVAS = new Table({
  name: process.env.TABLA_RESERVAS, documentClient: db,
  partitionKey: { name: 'RESERVA_ID', type: 'number' },
  indexes: {
    PorHotel: {
      type: 'global',
      partitionKey: { name: 'HOTEL_ID', type: 'number' },
      sortKey: { name: 'RESERVA_ID', type: 'number' }
    }
  }
});

export const MODELO_HOTEL = new Entity({
  name: 'Hotel', table: TABLA_HOTELES,
  entityAttribute: false, timestamps: false,
  schema: item({
    hotelId: number().key().savedAs('HOTEL_ID'),
    nombre: string().savedAs('NOMBRE')
  })
});

export const MODELO_RESERVA = new Entity({
  name: 'Reserva', table: TABLA_RESERVAS,
  entityAttribute: false, timestamps: false,
  schema: item({
    reservaId: number().key().savedAs('RESERVA_ID'),
    nombre: string().savedAs('NOMBRE'),
    noches: number().savedAs('NOCHES'),
    hotelId: number().savedAs('HOTEL_ID')
  })
});
