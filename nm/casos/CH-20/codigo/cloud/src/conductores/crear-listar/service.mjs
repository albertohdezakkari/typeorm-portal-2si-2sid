import { crearConductorRepository, listarConductoresRepository } from './repository.mjs';

export async function crearConductorService(nombre, apellidos, email) {
  const conductorId = Date.now();
  const conductor = { conductorId, nombre, apellidos, email };
  await crearConductorRepository(conductor);
  return conductor;
}

export function listarConductoresService() {
  return listarConductoresRepository();
}
