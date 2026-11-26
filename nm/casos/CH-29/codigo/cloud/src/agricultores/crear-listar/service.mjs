import { crearAgricultorRepository, listarAgricultoresRepository } from './repository.mjs';

export async function crearAgricultorService(nombre, apellidos, email) {
  const agricultorId = Date.now();
  const agricultor = { agricultorId, nombre, apellidos, email };
  await crearAgricultorRepository(agricultor);
  return agricultor;
}

export function listarAgricultoresService() {
  return listarAgricultoresRepository();
}
