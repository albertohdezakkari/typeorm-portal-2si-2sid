import { crearHuespedRepository, listarHuespedesRepository } from './repository.mjs';

export async function crearHuespedService(nombre, apellidos, email) {
  const huespedId = Date.now();
  const huesped = { huespedId, nombre, apellidos, email };
  await crearHuespedRepository(huesped);
  return huesped;
}

export function listarHuespedesService() {
  return listarHuespedesRepository();
}
