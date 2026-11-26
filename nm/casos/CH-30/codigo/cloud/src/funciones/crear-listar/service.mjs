import { crearFuncionRepository, listarFuncionesRepository } from './repository.mjs';

export async function crearFuncionService(nombre, aforo, teatroId) {
  const funcionId = Date.now();
  const funcion = { funcionId, nombre, aforo, teatroId };
  await crearFuncionRepository(funcion);
  return funcion;
}

export function listarFuncionesService() {
  return listarFuncionesRepository();
}
