import { crearComplejoRepository, listarComplejosRepository } from './repository.mjs';

export async function crearComplejoService(nombre) {
  const complejoId = Date.now();
  const complejo = { complejoId, nombre };
  await crearComplejoRepository(complejo);
  return complejo;
}

export function listarComplejosService() {
  return listarComplejosRepository();
}