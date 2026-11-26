import { crearGuiaRepository, listarGuiasRepository } from './repository.mjs';

export async function crearGuiaService(nombre, apellidos, email) {
  const guiaId = Date.now();
  const guia = { guiaId, nombre, apellidos, email };
  await crearGuiaRepository(guia);
  return guia;
}

export function listarGuiasService() {
  return listarGuiasRepository();
}
