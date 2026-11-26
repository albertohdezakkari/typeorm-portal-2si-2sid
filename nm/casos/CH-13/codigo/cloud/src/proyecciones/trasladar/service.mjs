import { trasladarProyeccionRepository } from './repository.mjs';
import { buscarCineRepository } from '../../cines/consultar/repository.mjs';

export async function trasladarProyeccionService(proyeccionId, cineId) {
  const cine = await buscarCineRepository(cineId);
  if (!cine) throw new Error('Cine no encontrado');
  return trasladarProyeccionRepository(proyeccionId, cineId);
}
