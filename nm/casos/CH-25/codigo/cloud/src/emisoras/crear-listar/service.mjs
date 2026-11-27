import { crearEmisoraRepository, listarEmisorasRepository } from './repository.mjs';

export async function crearEmisoraService(nombre) {
  const emisoraId = Date.now();
  const emisora = { emisoraId, nombre };
  await crearEmisoraRepository(emisora);
  return emisora;
}

export function listarEmisorasService() {
  return listarEmisorasRepository();
}