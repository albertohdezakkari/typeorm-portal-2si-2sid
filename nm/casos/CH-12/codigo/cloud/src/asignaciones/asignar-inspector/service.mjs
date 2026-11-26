import { buscarLoteRepository, buscarInspectorRepository, asignarInspectorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarInspectorService(loteId, inspectorId, rol) {
  const lote = await buscarLoteRepository(loteId);
  const inspector = await buscarInspectorRepository(inspectorId);
  if (!lote || !inspector) {
    throw new ReferenciaInexistenteError('No existe el lote o el inspector');
  }
  return asignarInspectorRepository(loteId, inspectorId, rol);
}
