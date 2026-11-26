import { buscarPiezaRepository, buscarRestauradorRepository, asignarRestauradorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarRestauradorService(piezaId, restauradorId, rol) {
  const pieza = await buscarPiezaRepository(piezaId);
  const restaurador = await buscarRestauradorRepository(restauradorId);
  if (!pieza || !restaurador) {
    throw new ReferenciaInexistenteError('No existe la pieza o el restaurador');
  }
  return asignarRestauradorRepository(piezaId, restauradorId, rol);
}
