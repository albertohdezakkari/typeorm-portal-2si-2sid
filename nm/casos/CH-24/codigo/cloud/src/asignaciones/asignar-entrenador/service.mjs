import { buscarPistaRepository, buscarEntrenadorRepository, asignarEntrenadorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarEntrenadorService(pistaId, entrenadorId, rol) {
  const pista = await buscarPistaRepository(pistaId);
  const entrenador = await buscarEntrenadorRepository(entrenadorId);
  if (!pista || !entrenador) {
    throw new ReferenciaInexistenteError('No existe la pista o el entrenador');
  }
  return asignarEntrenadorRepository(pistaId, entrenadorId, rol);
}
