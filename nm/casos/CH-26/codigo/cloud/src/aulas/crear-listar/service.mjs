import { crearAulaRepository, listarAulasRepository } from './repository.mjs';

export async function crearAulaService(nombre, capacidad, escuelaId) {
  const aulaId = Date.now();
  const aula = { aulaId, nombre, capacidad, escuelaId };
  await crearAulaRepository(aula);
  return aula;
}

export function listarAulasService() {
  return listarAulasRepository();
}
