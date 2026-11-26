import { buscarComandaRepository, buscarCocineroRepository, asignarCocineroRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarCocineroService(comandaId, cocineroId, rol) {
  const comanda = await buscarComandaRepository(comandaId);
  const cocinero = await buscarCocineroRepository(cocineroId);
  if (!comanda || !cocinero) {
    throw new ReferenciaInexistenteError('No existe la comanda o el cocinero');
  }
  return asignarCocineroRepository(comandaId, cocineroId, rol);
}
