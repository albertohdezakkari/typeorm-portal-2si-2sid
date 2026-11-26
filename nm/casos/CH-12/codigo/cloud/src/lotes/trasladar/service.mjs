import { trasladarLoteRepository } from './repository.mjs';
import { buscarCooperativaRepository } from '../../cooperativas/consultar/repository.mjs';

export async function trasladarLoteService(loteId, cooperativaId) {
  const cooperativa = await buscarCooperativaRepository(cooperativaId);
  if (!cooperativa) throw new Error('Cooperativa no encontrado');
  return trasladarLoteRepository(loteId, cooperativaId);
}
