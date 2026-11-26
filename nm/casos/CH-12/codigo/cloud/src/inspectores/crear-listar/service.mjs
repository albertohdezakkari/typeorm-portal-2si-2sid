import { crearInspectorRepository, listarInspectoresRepository } from './repository.mjs';

export async function crearInspectorService(nombre, apellidos, email) {
  const inspectorId = Date.now();
  const inspector = { inspectorId, nombre, apellidos, email };
  await crearInspectorRepository(inspector);
  return inspector;
}

export function listarInspectoresService() {
  return listarInspectoresRepository();
}
