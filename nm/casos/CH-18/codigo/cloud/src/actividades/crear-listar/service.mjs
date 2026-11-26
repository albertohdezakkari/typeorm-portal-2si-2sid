import { crearActividadRepository, listarActividadesRepository } from './repository.mjs';

export async function crearActividadService(nombre, plazas, clubId) {
  const actividadId = Date.now();
  const actividad = { actividadId, nombre, plazas, clubId };
  await crearActividadRepository(actividad);
  return actividad;
}

export function listarActividadesService() {
  return listarActividadesRepository();
}
