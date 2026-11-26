import { buscarAgenciaRepository, consultarAgenciaRepository } from './repository.mjs';

export async function consultarAgenciaService(agenciaId, minimo) {
  const agencia = await buscarAgenciaRepository(agenciaId);
  if (!agencia) throw new Error('Agencia no encontrado');
  const excursiones = await consultarAgenciaRepository(agenciaId, minimo);
  return { agencia, excursiones };
}
