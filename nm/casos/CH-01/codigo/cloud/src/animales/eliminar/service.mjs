import { eliminarAnimalRepository } from './repository.mjs';

export async function eliminarAnimalService(animalId) {
  await eliminarAnimalRepository(animalId);
}
