import { crearAgenciaRepository, listarAgenciasRepository } from './repository.mjs';

export async function crearAgenciaService(nombre) {
  const agenciaId = Date.now();
  const agencia = { agenciaId, nombre };
  await crearAgenciaRepository(agencia);
  return agencia;
}

export function listarAgenciasService() {
  return listarAgenciasRepository();
}