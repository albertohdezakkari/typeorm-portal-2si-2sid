import { buscarFestivalRepository, consultarFestivalRepository } from './repository.mjs';

export async function consultarFestivalService(festivalId, minimo) {
  const festival = await buscarFestivalRepository(festivalId);
  if (!festival) throw new Error('Festival no encontrado');
  const actuaciones = await consultarFestivalRepository(festivalId, minimo);
  return { festival, actuaciones };
}
