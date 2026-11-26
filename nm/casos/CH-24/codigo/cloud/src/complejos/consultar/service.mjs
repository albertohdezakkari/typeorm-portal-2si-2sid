import { buscarComplejoRepository, consultarComplejoRepository } from './repository.mjs';

export async function consultarComplejoService(complejoId, minimo) {
  const complejo = await buscarComplejoRepository(complejoId);
  if (!complejo) throw new Error('Complejo no encontrado');
  const pistas = await consultarComplejoRepository(complejoId, minimo);
  return { complejo, pistas };
}
