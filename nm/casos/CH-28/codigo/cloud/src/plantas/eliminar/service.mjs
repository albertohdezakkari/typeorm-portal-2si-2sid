import { eliminarPlantaRepository } from './repository.mjs';

export async function eliminarPlantaService(plantaId) {
  await eliminarPlantaRepository(plantaId);
}
