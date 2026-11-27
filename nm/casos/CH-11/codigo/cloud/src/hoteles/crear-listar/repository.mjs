import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HOTEL } from '../../models/hotel-reserva.model.mjs';

export async function crearHotelRepository(hotel) {
  await MODELO_HOTEL.build(EntityRepository).put(
    hotel,
    { condition: { attr: 'hotelId', exists: false } }
  );
}

export async function listarHotelesRepository() {
  const { Items = [] } = await MODELO_HOTEL.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}