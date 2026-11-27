import { crearGimnasioRepository, listarGimnasiosRepository } from './repository.mjs';

export async function crearGimnasioService(nombre) {
  const gimnasioId = Date.now();
  const gimnasio = { gimnasioId, nombre };
  await crearGimnasioRepository(gimnasio);
  return gimnasio;
}

export function listarGimnasiosService() {
  return listarGimnasiosRepository();
}