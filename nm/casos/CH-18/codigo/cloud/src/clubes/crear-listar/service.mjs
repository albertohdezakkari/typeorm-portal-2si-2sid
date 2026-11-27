import { crearClubRepository, listarClubesRepository } from './repository.mjs';

export async function crearClubService(nombre) {
  const clubId = Date.now();
  const club = { clubId, nombre };
  await crearClubRepository(club);
  return club;
}

export function listarClubesService() {
  return listarClubesRepository();
}