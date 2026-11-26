import { buscarRefugioRepository, consultarRefugioRepository } from './repository.mjs';

export async function consultarRefugioService(refugioId, minimo) {
  const refugio = await buscarRefugioRepository(refugioId);
  if (!refugio) throw new Error('Refugio no encontrado');
  const animales = await consultarRefugioRepository(refugioId, minimo);
  return { refugio, animales };
}
