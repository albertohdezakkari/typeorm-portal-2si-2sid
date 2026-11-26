import { buscarProgramaRepository, buscarLocutorRepository, asignarLocutorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarLocutorService(programaId, locutorId, rol) {
  const programa = await buscarProgramaRepository(programaId);
  const locutor = await buscarLocutorRepository(locutorId);
  if (!programa || !locutor) {
    throw new ReferenciaInexistenteError('No existe el programa o el locutor');
  }
  return asignarLocutorRepository(programaId, locutorId, rol);
}
