import { crearRevisorRepository, listarRevisoresRepository } from './repository.mjs';

export async function crearRevisorService(nombre, apellidos, email) {
  const revisorId = Date.now();
  const revisor = { revisorId, nombre, apellidos, email };
  await crearRevisorRepository(revisor);
  return revisor;
}

export function listarRevisoresService() {
  return listarRevisoresRepository();
}
