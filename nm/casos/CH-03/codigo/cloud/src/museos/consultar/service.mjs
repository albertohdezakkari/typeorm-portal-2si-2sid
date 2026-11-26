import { buscarMuseoRepository, consultarMuseoRepository } from './repository.mjs';

export async function consultarMuseoService(museoId, minimo) {
  const museo = await buscarMuseoRepository(museoId);
  if (!museo) throw new Error('Museo no encontrado');
  const piezas = await consultarMuseoRepository(museoId, minimo);
  return { museo, piezas };
}
