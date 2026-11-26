import { crearPlantaRepository, listarPlantasRepository } from './repository.mjs';

export async function crearPlantaService(nombre, alturaCm, viveroId) {
  const plantaId = Date.now();
  const planta = { plantaId, nombre, alturaCm, viveroId };
  await crearPlantaRepository(planta);
  return planta;
}

export function listarPlantasService() {
  return listarPlantasRepository();
}
