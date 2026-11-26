import { buscarHotelRepository, consultarHotelRepository } from './repository.mjs';

export async function consultarHotelService(hotelId, minimo) {
  const hotel = await buscarHotelRepository(hotelId);
  if (!hotel) throw new Error('Hotel no encontrado');
  const reservas = await consultarHotelRepository(hotelId, minimo);
  return { hotel, reservas };
}
