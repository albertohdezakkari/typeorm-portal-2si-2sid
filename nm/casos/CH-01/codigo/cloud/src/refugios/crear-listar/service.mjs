import { crearRefugioRepository, listarRefugiosRepository } from './repository.mjs';

export async function crearRefugioService(nombre) {
  const refugioId = Date.now();
  const refugio = { refugioId, nombre };
  await crearRefugioRepository(refugio);
  return refugio;
}

export function listarRefugiosService() {
  return listarRefugiosRepository();
}