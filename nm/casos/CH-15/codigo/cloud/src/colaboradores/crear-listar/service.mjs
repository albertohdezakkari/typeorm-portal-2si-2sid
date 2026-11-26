import { crearColaboradorRepository, listarColaboradoresRepository } from './repository.mjs';

export async function crearColaboradorService(nombre, apellidos, email) {
  const colaboradorId = Date.now();
  const colaborador = { colaboradorId, nombre, apellidos, email };
  await crearColaboradorRepository(colaborador);
  return colaborador;
}

export function listarColaboradoresService() {
  return listarColaboradoresRepository();
}
