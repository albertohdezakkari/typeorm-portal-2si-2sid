import { crearPanaderiaRepository, listarPanaderiasRepository } from './repository.mjs';

export async function crearPanaderiaService(nombre) {
  const panaderiaId = Date.now();
  const panaderia = { panaderiaId, nombre };
  await crearPanaderiaRepository(panaderia);
  return panaderia;
}

export function listarPanaderiasService() {
  return listarPanaderiasRepository();
}