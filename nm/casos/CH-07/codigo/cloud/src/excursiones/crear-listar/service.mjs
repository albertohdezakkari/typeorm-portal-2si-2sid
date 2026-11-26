import { crearExcursionRepository, listarExcursionesRepository } from './repository.mjs';

export async function crearExcursionService(nombre, duracionHoras, agenciaId) {
  const excursionId = Date.now();
  const excursion = { excursionId, nombre, duracionHoras, agenciaId };
  await crearExcursionRepository(excursion);
  return excursion;
}

export function listarExcursionesService() {
  return listarExcursionesRepository();
}
