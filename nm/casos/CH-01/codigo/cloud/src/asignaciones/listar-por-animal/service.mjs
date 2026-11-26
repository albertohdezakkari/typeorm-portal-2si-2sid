import { listarAsignacionesPorAnimalRepository } from './repository.mjs';

export function listarAsignacionesPorAnimalService(animalId) {
  return listarAsignacionesPorAnimalRepository(animalId);
}
