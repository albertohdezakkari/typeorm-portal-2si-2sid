import { crearSesionRepository, listarSesionesRepository } from './repository.mjs';

export async function crearSesionService(nombre, plazas, gimnasioId) {
  const sesionId = Date.now();
  const sesion = { sesionId, nombre, plazas, gimnasioId };
  await crearSesionRepository(sesion);
  return sesion;
}

export function listarSesionesService() {
  return listarSesionesRepository();
}
