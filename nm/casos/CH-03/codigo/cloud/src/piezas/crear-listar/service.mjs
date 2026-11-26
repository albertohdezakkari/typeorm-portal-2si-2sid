import { crearPiezaRepository, listarPiezasRepository } from './repository.mjs';

export async function crearPiezaService(nombre, antiguedadAnios, museoId) {
  const piezaId = Date.now();
  const pieza = { piezaId, nombre, antiguedadAnios, museoId };
  await crearPiezaRepository(pieza);
  return pieza;
}

export function listarPiezasService() {
  return listarPiezasRepository();
}
