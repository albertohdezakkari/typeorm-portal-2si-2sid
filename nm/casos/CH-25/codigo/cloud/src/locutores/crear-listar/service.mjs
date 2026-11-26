import { crearLocutorRepository, listarLocutoresRepository } from './repository.mjs';

export async function crearLocutorService(nombre, apellidos, email) {
  const locutorId = Date.now();
  const locutor = { locutorId, nombre, apellidos, email };
  await crearLocutorRepository(locutor);
  return locutor;
}

export function listarLocutoresService() {
  return listarLocutoresRepository();
}
