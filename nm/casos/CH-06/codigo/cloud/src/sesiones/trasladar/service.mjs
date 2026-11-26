import { trasladarSesionRepository } from './repository.mjs';
import { buscarGimnasioRepository } from '../../gimnasios/consultar/repository.mjs';

export async function trasladarSesionService(sesionId, gimnasioId) {
  const gimnasio = await buscarGimnasioRepository(gimnasioId);
  if (!gimnasio) throw new Error('Gimnasio no encontrado');
  return trasladarSesionRepository(sesionId, gimnasioId);
}
