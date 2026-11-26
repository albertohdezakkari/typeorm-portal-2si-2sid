import { crearTrayectoRepository, listarTrayectosRepository } from './repository.mjs';

export async function crearTrayectoService(nombre, distanciaKm, estacionId) {
  const trayectoId = Date.now();
  const trayecto = { trayectoId, nombre, distanciaKm, estacionId };
  await crearTrayectoRepository(trayecto);
  return trayecto;
}

export function listarTrayectosService() {
  return listarTrayectosRepository();
}
