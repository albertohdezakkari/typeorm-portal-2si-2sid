import { crearUrbanizacionRepository, listarUrbanizacionesRepository } from './repository.mjs';

export async function crearUrbanizacionService(nombre) {
  const urbanizacionId = Date.now();
  const urbanizacion = { urbanizacionId, nombre };
  await crearUrbanizacionRepository(urbanizacion);
  return urbanizacion;
}

export function listarUrbanizacionesService() {
  return listarUrbanizacionesRepository();
}