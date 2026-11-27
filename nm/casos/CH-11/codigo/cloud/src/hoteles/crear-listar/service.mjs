import { crearHotelRepository, listarHotelesRepository } from './repository.mjs';

export async function crearHotelService(nombre) {
  const hotelId = Date.now();
  const hotel = { hotelId, nombre };
  await crearHotelRepository(hotel);
  return hotel;
}

export function listarHotelesService() {
  return listarHotelesRepository();
}