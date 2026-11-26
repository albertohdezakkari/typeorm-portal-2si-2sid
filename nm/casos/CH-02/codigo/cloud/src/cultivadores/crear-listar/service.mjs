import { crearCultivadorRepository, listarCultivadoresRepository } from './repository.mjs';

export async function crearCultivadorService(nombre, apellidos, email) {
  const cultivadorId = Date.now();
  const cultivador = { cultivadorId, nombre, apellidos, email };
  await crearCultivadorRepository(cultivador);
  return cultivador;
}

export function listarCultivadoresService() {
  return listarCultivadoresRepository();
}
