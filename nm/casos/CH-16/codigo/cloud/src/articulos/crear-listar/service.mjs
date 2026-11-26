import { crearArticuloRepository, listarArticulosRepository } from './repository.mjs';

export async function crearArticuloService(nombre, stock, tiendaId) {
  const articuloId = Date.now();
  const articulo = { articuloId, nombre, stock, tiendaId };
  await crearArticuloRepository(articulo);
  return articulo;
}

export function listarArticulosService() {
  return listarArticulosRepository();
}
