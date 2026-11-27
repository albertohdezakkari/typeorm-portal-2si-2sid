import { crearGranjaRepository, listarGranjasRepository } from './repository.mjs';

export async function crearGranjaService(nombre) {
  const granjaId = Date.now();
  const granja = { granjaId, nombre };
  await crearGranjaRepository(granja);
  return granja;
}

export function listarGranjasService() {
  return listarGranjasRepository();
}