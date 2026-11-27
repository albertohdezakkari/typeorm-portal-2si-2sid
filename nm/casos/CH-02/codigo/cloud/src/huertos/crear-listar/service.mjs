import { crearHuertoRepository, listarHuertosRepository } from './repository.mjs';

export async function crearHuertoService(nombre) {
  const huertoId = Date.now();
  const huerto = { huertoId, nombre };
  await crearHuertoRepository(huerto);
  return huerto;
}

export function listarHuertosService() {
  return listarHuertosRepository();
}