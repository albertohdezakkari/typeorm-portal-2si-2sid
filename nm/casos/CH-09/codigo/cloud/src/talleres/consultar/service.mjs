import { buscarTallerRepository, consultarTallerRepository } from './repository.mjs';

export async function consultarTallerService(tallerId, minimo) {
  const taller = await buscarTallerRepository(tallerId);
  if (!taller) throw new Error('Taller no encontrado');
  const reparaciones = await consultarTallerRepository(tallerId, minimo);
  return { taller, reparaciones };
}
