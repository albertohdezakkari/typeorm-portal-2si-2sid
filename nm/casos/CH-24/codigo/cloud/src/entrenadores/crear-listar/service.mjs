import { crearEntrenadorRepository, listarEntrenadoresRepository } from './repository.mjs';

export async function crearEntrenadorService(nombre, apellidos, email) {
  const entrenadorId = Date.now();
  const entrenador = { entrenadorId, nombre, apellidos, email };
  await crearEntrenadorRepository(entrenador);
  return entrenador;
}

export function listarEntrenadoresService() {
  return listarEntrenadoresRepository();
}
