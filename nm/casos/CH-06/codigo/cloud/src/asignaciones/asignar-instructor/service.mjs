import { buscarSesionRepository, buscarInstructorRepository, asignarInstructorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarInstructorService(sesionId, instructorId, rol) {
  const sesion = await buscarSesionRepository(sesionId);
  const instructor = await buscarInstructorRepository(instructorId);
  if (!sesion || !instructor) {
    throw new ReferenciaInexistenteError('No existe la sesion o el instructor');
  }
  return asignarInstructorRepository(sesionId, instructorId, rol);
}
