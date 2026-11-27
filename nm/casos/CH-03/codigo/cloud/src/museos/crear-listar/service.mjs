import { crearMuseoRepository, listarMuseosRepository } from './repository.mjs';

export async function crearMuseoService(nombre) {
  const museoId = Date.now();
  const museo = { museoId, nombre };
  await crearMuseoRepository(museo);
  return museo;
}

export function listarMuseosService() {
  return listarMuseosRepository();
}