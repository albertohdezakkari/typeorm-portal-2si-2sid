import { trasladarActuacionRepository } from './repository.mjs';
import { buscarFestivalRepository } from '../../festivales/consultar/repository.mjs';

export async function trasladarActuacionService(actuacionId, festivalId) {
  const festival = await buscarFestivalRepository(festivalId);
  if (!festival) throw new Error('Festival no encontrado');
  return trasladarActuacionRepository(actuacionId, festivalId);
}
