import { buscarMuestraRepository, buscarAnalistaRepository, asignarAnalistaRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarAnalistaService(muestraId, analistaId, rol) {
  const muestra = await buscarMuestraRepository(muestraId);
  const analista = await buscarAnalistaRepository(analistaId);
  if (!muestra || !analista) {
    throw new ReferenciaInexistenteError('No existe la muestra o el analista');
  }
  return asignarAnalistaRepository(muestraId, analistaId, rol);
}
