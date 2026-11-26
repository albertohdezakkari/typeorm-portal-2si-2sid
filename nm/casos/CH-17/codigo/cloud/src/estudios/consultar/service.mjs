import { buscarEstudioRepository, consultarEstudioRepository } from './repository.mjs';

export async function consultarEstudioService(estudioId, minimo) {
  const estudio = await buscarEstudioRepository(estudioId);
  if (!estudio) throw new Error('Estudio no encontrado');
  const escenas = await consultarEstudioRepository(estudioId, minimo);
  return { estudio, escenas };
}
