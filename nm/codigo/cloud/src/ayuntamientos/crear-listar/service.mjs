import { crearAyuntamientoRepository, listarAyuntamientosRepository } from './repository.mjs';

export async function crearAyuntamientoService(nombre) {
  const ayuntamientoId = Date.now();
  const ayuntamiento = { ayuntamientoId, nombre };
  await crearAyuntamientoRepository(ayuntamiento);
  return ayuntamiento;
}

export function listarAyuntamientosService() {
  return listarAyuntamientosRepository();
}