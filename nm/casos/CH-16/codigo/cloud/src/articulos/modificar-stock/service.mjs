import { modificarStockRepository } from './repository.mjs';

export function modificarStockService(articuloId, stock) {
  return modificarStockRepository(articuloId, stock);
}
