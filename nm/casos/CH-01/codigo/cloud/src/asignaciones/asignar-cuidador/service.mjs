import { buscarAnimalRepository, buscarCuidadorRepository, asignarCuidadorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarCuidadorService(animalId, cuidadorId, rol) {
  const animal = await buscarAnimalRepository(animalId);
  const cuidador = await buscarCuidadorRepository(cuidadorId);
  if (!animal || !cuidador) {
    throw new ReferenciaInexistenteError('No existe el animal o el cuidador');
  }
  return asignarCuidadorRepository(animalId, cuidadorId, rol);
}
