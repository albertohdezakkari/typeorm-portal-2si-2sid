import { crearLoteRepository, listarLotesRepository } from './repository.mjs';

export async function crearLoteService(nombre, kilos, cooperativaId) {
  const loteId = Date.now();
  const lote = { loteId, nombre, kilos, cooperativaId };
  await crearLoteRepository(lote);
  return lote;
}

export function listarLotesService() {
  return listarLotesRepository();
}
