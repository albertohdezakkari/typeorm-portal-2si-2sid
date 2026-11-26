import { crearEmbarcacionRepository, listarEmbarcacionesRepository } from './repository.mjs';

export async function crearEmbarcacionService(nombre, esloraMetros, puertoId) {
  const embarcacionId = Date.now();
  const embarcacion = { embarcacionId, nombre, esloraMetros, puertoId };
  await crearEmbarcacionRepository(embarcacion);
  return embarcacion;
}

export function listarEmbarcacionesService() {
  return listarEmbarcacionesRepository();
}
