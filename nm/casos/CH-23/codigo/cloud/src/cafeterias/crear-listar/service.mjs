import { crearCafeteriaRepository, listarCafeteriasRepository } from './repository.mjs';

export async function crearCafeteriaService(nombre) {
  const cafeteriaId = Date.now();
  const cafeteria = { cafeteriaId, nombre };
  await crearCafeteriaRepository(cafeteria);
  return cafeteria;
}

export function listarCafeteriasService() {
  return listarCafeteriasRepository();
}