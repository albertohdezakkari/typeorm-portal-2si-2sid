import { crearProgramaRepository, listarProgramasRepository } from './repository.mjs';

export async function crearProgramaService(nombre, duracionMinutos, emisoraId) {
  const programaId = Date.now();
  const programa = { programaId, nombre, duracionMinutos, emisoraId };
  await crearProgramaRepository(programa);
  return programa;
}

export function listarProgramasService() {
  return listarProgramasRepository();
}
