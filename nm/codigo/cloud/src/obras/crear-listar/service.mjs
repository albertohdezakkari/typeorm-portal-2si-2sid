import { crearObraRepository, listarObrasRepository } from './repository.mjs';

export async function crearObraService(nombre, presupuestoEuros, ayuntamientoId) {
  const obraId = Date.now();
  const obra = { obraId, nombre, presupuestoEuros, ayuntamientoId };
  await crearObraRepository(obra);
  return obra;
}

export function listarObrasService() {
  return listarObrasRepository();
}
