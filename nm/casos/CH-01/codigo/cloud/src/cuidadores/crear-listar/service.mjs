import { crearCuidadorRepository, listarCuidadoresRepository } from './repository.mjs';

export async function crearCuidadorService(nombre, apellidos, email) {
  const cuidadorId = Date.now();
  const cuidador = { cuidadorId, nombre, apellidos, email };
  await crearCuidadorRepository(cuidador);
  return cuidador;
}

export function listarCuidadoresService() {
  return listarCuidadoresRepository();
}
