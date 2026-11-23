import { crearProfesionalRepository, listarProfesionalesRepository } from './repository.mjs';

export async function crearProfesionalService(nombre, apellidos, email) {
  const profesionalId = Date.now();
  const profesional = { profesionalId, nombre, apellidos, email };
  await crearProfesionalRepository(profesional);
  return profesional;
}

export function listarProfesionalesService() {
  return listarProfesionalesRepository();
}
