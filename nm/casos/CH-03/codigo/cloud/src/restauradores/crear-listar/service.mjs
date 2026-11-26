import { crearRestauradorRepository, listarRestauradoresRepository } from './repository.mjs';

export async function crearRestauradorService(nombre, apellidos, email) {
  const restauradorId = Date.now();
  const restaurador = { restauradorId, nombre, apellidos, email };
  await crearRestauradorRepository(restaurador);
  return restaurador;
}

export function listarRestauradoresService() {
  return listarRestauradoresRepository();
}
