import { trasladarExcursionRepository } from './repository.mjs';
import { buscarAgenciaRepository } from '../../agencias/consultar/repository.mjs';

export async function trasladarExcursionService(excursionId, agenciaId) {
  const agencia = await buscarAgenciaRepository(agenciaId);
  if (!agencia) throw new Error('Agencia no encontrado');
  return trasladarExcursionRepository(excursionId, agenciaId);
}
