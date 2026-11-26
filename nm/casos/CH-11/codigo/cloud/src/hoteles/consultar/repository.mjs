import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_RESERVA, MODELO_HOTEL } from '../../models/hotel-reserva.model.mjs';

export async function buscarHotelRepository(hotelId) {
  const { Item } = await MODELO_HOTEL.build(EntityRepository).get(
    { hotelId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarHotelRepository(hotelId, minimo) {
  const { Items = [] } = await MODELO_RESERVA.build(EntityRepository).query(
    { index: 'PorHotel', partition: hotelId },
    { filters: { Reserva: { attr: 'noches', gte: minimo } } }
  );
  return Items;
}
