import { buscarExcursionRepository, buscarGuiaRepository, asignarGuiaRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarGuiaService(excursionId, guiaId, rol) {
  const excursion = await buscarExcursionRepository(excursionId);
  const guia = await buscarGuiaRepository(guiaId);
  if (!excursion || !guia) {
    throw new ReferenciaInexistenteError('No existe la excursion o el guia');
  }
  return asignarGuiaRepository(excursionId, guiaId, rol);
}
