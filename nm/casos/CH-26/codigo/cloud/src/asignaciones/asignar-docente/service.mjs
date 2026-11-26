import { buscarAulaRepository, buscarDocenteRepository, asignarDocenteRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarDocenteService(aulaId, docenteId, rol) {
  const aula = await buscarAulaRepository(aulaId);
  const docente = await buscarDocenteRepository(docenteId);
  if (!aula || !docente) {
    throw new ReferenciaInexistenteError('No existe la aula o el docente');
  }
  return asignarDocenteRepository(aulaId, docenteId, rol);
}
