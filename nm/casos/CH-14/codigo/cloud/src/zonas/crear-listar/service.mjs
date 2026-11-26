import { crearZonaRepository, listarZonasRepository } from './repository.mjs';

export async function crearZonaService(nombre, capacidad, parqueId) {
  const zonaId = Date.now();
  const zona = { zonaId, nombre, capacidad, parqueId };
  await crearZonaRepository(zona);
  return zona;
}

export function listarZonasService() {
  return listarZonasRepository();
}
