import { modificarPresupuestoEurosRepository } from './repository.mjs';

export function modificarPresupuestoEurosService(obraId, presupuestoEuros) {
  return modificarPresupuestoEurosRepository(obraId, presupuestoEuros);
}
