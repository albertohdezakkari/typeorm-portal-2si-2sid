import { crearAnalistaRepository, listarAnalistasRepository } from './repository.mjs';

export async function crearAnalistaService(nombre, apellidos, email) {
  const analistaId = Date.now();
  const analista = { analistaId, nombre, apellidos, email };
  await crearAnalistaRepository(analista);
  return analista;
}

export function listarAnalistasService() {
  return listarAnalistasRepository();
}
