import { trasladarPlantaRepository } from './repository.mjs';
import { buscarViveroRepository } from '../../viveros/consultar/repository.mjs';

export async function trasladarPlantaService(plantaId, viveroId) {
  const vivero = await buscarViveroRepository(viveroId);
  if (!vivero) throw new Error('Vivero no encontrado');
  return trasladarPlantaRepository(plantaId, viveroId);
}
