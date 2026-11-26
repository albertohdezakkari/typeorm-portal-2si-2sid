import { buscarEscuelaRepository, consultarEscuelaRepository } from './repository.mjs';

export async function consultarEscuelaService(escuelaId, minimo) {
  const escuela = await buscarEscuelaRepository(escuelaId);
  if (!escuela) throw new Error('Escuela no encontrado');
  const aulas = await consultarEscuelaRepository(escuelaId, minimo);
  return { escuela, aulas };
}
