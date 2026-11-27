import { crearEstudioRepository, listarEstudiosRepository } from './repository.mjs';

export async function crearEstudioService(nombre) {
  const estudioId = Date.now();
  const estudio = { estudioId, nombre };
  await crearEstudioRepository(estudio);
  return estudio;
}

export function listarEstudiosService() {
  return listarEstudiosRepository();
}