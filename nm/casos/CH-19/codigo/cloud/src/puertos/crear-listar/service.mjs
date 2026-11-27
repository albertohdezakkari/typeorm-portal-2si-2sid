import { crearPuertoRepository, listarPuertosRepository } from './repository.mjs';

export async function crearPuertoService(nombre) {
  const puertoId = Date.now();
  const puerto = { puertoId, nombre };
  await crearPuertoRepository(puerto);
  return puerto;
}

export function listarPuertosService() {
  return listarPuertosRepository();
}