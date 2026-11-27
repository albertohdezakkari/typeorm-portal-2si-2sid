import { crearTallerRepository, listarTalleresRepository } from './repository.mjs';

export async function crearTallerService(nombre) {
  const tallerId = Date.now();
  const taller = { tallerId, nombre };
  await crearTallerRepository(taller);
  return taller;
}

export function listarTalleresService() {
  return listarTalleresRepository();
}