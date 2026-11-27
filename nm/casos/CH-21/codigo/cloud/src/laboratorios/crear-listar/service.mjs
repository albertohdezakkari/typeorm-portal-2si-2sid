import { crearLaboratorioRepository, listarLaboratoriosRepository } from './repository.mjs';

export async function crearLaboratorioService(nombre) {
  const laboratorioId = Date.now();
  const laboratorio = { laboratorioId, nombre };
  await crearLaboratorioRepository(laboratorio);
  return laboratorio;
}

export function listarLaboratoriosService() {
  return listarLaboratoriosRepository();
}