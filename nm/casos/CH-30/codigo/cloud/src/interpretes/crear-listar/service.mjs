import { crearInterpreteRepository, listarInterpretesRepository } from './repository.mjs';

export async function crearInterpreteService(nombre, apellidos, email) {
  const interpreteId = Date.now();
  const interprete = { interpreteId, nombre, apellidos, email };
  await crearInterpreteRepository(interprete);
  return interprete;
}

export function listarInterpretesService() {
  return listarInterpretesRepository();
}
