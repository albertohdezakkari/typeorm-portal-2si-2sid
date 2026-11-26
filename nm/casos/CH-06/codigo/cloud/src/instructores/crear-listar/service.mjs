import { crearInstructorRepository, listarInstructoresRepository } from './repository.mjs';

export async function crearInstructorService(nombre, apellidos, email) {
  const instructorId = Date.now();
  const instructor = { instructorId, nombre, apellidos, email };
  await crearInstructorRepository(instructor);
  return instructor;
}

export function listarInstructoresService() {
  return listarInstructoresRepository();
}
