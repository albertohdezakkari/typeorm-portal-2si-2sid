import { modificarCosteCentimosRepository } from './repository.mjs';

export function modificarCosteCentimosService(reparacionId, costeCentimos) {
  return modificarCosteCentimosRepository(reparacionId, costeCentimos);
}
