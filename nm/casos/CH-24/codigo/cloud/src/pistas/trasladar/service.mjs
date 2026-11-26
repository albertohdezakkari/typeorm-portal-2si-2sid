import { trasladarPistaRepository } from './repository.mjs';
import { buscarComplejoRepository } from '../../complejos/consultar/repository.mjs';

export async function trasladarPistaService(pistaId, complejoId) {
  const complejo = await buscarComplejoRepository(complejoId);
  if (!complejo) throw new Error('Complejo no encontrado');
  return trasladarPistaRepository(pistaId, complejoId);
}
