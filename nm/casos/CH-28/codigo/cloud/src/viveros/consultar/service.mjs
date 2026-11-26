import { buscarViveroRepository, consultarViveroRepository } from './repository.mjs';

export async function consultarViveroService(viveroId, minimo) {
  const vivero = await buscarViveroRepository(viveroId);
  if (!vivero) throw new Error('Vivero no encontrado');
  const plantas = await consultarViveroRepository(viveroId, minimo);
  return { vivero, plantas };
}
