import { buscarGranjaRepository, consultarGranjaRepository } from './repository.mjs';

export async function consultarGranjaService(granjaId, minimo) {
  const granja = await buscarGranjaRepository(granjaId);
  if (!granja) throw new Error('Granja no encontrado');
  const cosechas = await consultarGranjaRepository(granjaId, minimo);
  return { granja, cosechas };
}
