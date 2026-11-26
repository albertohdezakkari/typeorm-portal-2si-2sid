import { crearAutorRepository, listarAutoresRepository } from './repository.mjs';

export async function crearAutorService(nombre, apellidos, email) {
  const autorId = Date.now();
  const autor = { autorId, nombre, apellidos, email };
  await crearAutorRepository(autor);
  return autor;
}

export function listarAutoresService() {
  return listarAutoresRepository();
}
