import { buscarTiendaRepository, consultarTiendaRepository } from './repository.mjs';

export async function consultarTiendaService(tiendaId, minimo) {
  const tienda = await buscarTiendaRepository(tiendaId);
  if (!tienda) throw new Error('Tienda no encontrado');
  const articulos = await consultarTiendaRepository(tiendaId, minimo);
  return { tienda, articulos };
}
