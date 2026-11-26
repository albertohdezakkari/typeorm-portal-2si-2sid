import { buscarLaboratorioRepository, consultarLaboratorioRepository } from './repository.mjs';

export async function consultarLaboratorioService(laboratorioId, minimo) {
  const laboratorio = await buscarLaboratorioRepository(laboratorioId);
  if (!laboratorio) throw new Error('Laboratorio no encontrado');
  const muestras = await consultarLaboratorioRepository(laboratorioId, minimo);
  return { laboratorio, muestras };
}
