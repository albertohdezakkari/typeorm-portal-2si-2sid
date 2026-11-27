import { crearFestivalRepository, listarFestivalesRepository } from './repository.mjs';

export async function crearFestivalService(nombre) {
  const festivalId = Date.now();
  const festival = { festivalId, nombre };
  await crearFestivalRepository(festival);
  return festival;
}

export function listarFestivalesService() {
  return listarFestivalesRepository();
}