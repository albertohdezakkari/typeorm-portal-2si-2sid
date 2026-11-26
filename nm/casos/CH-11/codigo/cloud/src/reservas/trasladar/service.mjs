import { trasladarReservaRepository } from './repository.mjs';
import { buscarHotelRepository } from '../../hoteles/consultar/repository.mjs';

export async function trasladarReservaService(reservaId, hotelId) {
  const hotel = await buscarHotelRepository(hotelId);
  if (!hotel) throw new Error('Hotel no encontrado');
  return trasladarReservaRepository(reservaId, hotelId);
}
