import { crearTiendaRepository, listarTiendasRepository } from './repository.mjs';

export async function crearTiendaService(nombre) {
  const tiendaId = Date.now();
  const tienda = { tiendaId, nombre };
  await crearTiendaRepository(tienda);
  return tienda;
}

export function listarTiendasService() {
  return listarTiendasRepository();
}