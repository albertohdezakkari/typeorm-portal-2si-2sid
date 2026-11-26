import { buscarCooperativaRepository, consultarCooperativaRepository } from './repository.mjs';

export async function consultarCooperativaService(cooperativaId, minimo) {
  const cooperativa = await buscarCooperativaRepository(cooperativaId);
  if (!cooperativa) throw new Error('Cooperativa no encontrado');
  const lotes = await consultarCooperativaRepository(cooperativaId, minimo);
  return { cooperativa, lotes };
}
