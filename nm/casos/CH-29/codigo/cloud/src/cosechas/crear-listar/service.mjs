import { crearCosechaRepository, listarCosechasRepository } from './repository.mjs';

export async function crearCosechaService(nombre, kilos, granjaId) {
  const cosechaId = Date.now();
  const cosecha = { cosechaId, nombre, kilos, granjaId };
  await crearCosechaRepository(cosecha);
  return cosecha;
}

export function listarCosechasService() {
  return listarCosechasRepository();
}
