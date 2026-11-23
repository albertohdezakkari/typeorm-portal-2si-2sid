import { buscarObraRepository, buscarProfesionalRepository, asignarProfesionalRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarProfesionalService(obraId, profesionalId, rol) {
  const obra = await buscarObraRepository(obraId);
  const profesional = await buscarProfesionalRepository(profesionalId);
  if (!obra || !profesional) {
    throw new ReferenciaInexistenteError('No existe la obra o el profesional');
  }
  return asignarProfesionalRepository(obraId, profesionalId, rol);
}
