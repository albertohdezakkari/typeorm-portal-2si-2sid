import { crearAnimalRepository, listarAnimalesRepository } from './repository.mjs';

export async function crearAnimalService(nombre, edadMeses, refugioId) {
  const animalId = Date.now();
  const animal = { animalId, nombre, edadMeses, refugioId };
  await crearAnimalRepository(animal);
  return animal;
}

export function listarAnimalesService() {
  return listarAnimalesRepository();
}
