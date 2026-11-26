import { crearComandaRepository, listarComandasRepository } from './repository.mjs';

export async function crearComandaService(nombre, importeCentimos, cafeteriaId) {
  const comandaId = Date.now();
  const comanda = { comandaId, nombre, importeCentimos, cafeteriaId };
  await crearComandaRepository(comanda);
  return comanda;
}

export function listarComandasService() {
  return listarComandasRepository();
}
