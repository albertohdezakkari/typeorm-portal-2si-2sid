import { buscarDocumentoRepository, buscarRevisorRepository, asignarRevisorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarRevisorService(documentoId, revisorId, rol) {
  const documento = await buscarDocumentoRepository(documentoId);
  const revisor = await buscarRevisorRepository(revisorId);
  if (!documento || !revisor) {
    throw new ReferenciaInexistenteError('No existe el documento o el revisor');
  }
  return asignarRevisorRepository(documentoId, revisorId, rol);
}
