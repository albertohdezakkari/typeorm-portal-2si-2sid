import { trasladarArticuloRepository } from './repository.mjs';
import { buscarTiendaRepository } from '../../tiendas/consultar/repository.mjs';

export async function trasladarArticuloService(articuloId, tiendaId) {
  const tienda = await buscarTiendaRepository(tiendaId);
  if (!tienda) throw new Error('Tienda no encontrado');
  return trasladarArticuloRepository(articuloId, tiendaId);
}
