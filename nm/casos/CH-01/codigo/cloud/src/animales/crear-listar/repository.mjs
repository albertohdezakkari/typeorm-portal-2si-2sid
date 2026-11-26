import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ANIMAL, MODELO_REFUGIO } from '../../models/refugio-animal.model.mjs';

export async function crearAnimalRepository(animal) {
  await MODELO_ANIMAL.build(EntityRepository).put(
    animal,
    { condition: { attr: 'animalId', exists: false } }
  );
}

export async function listarAnimalesRepository() {
  const { Items = [] } = await MODELO_ANIMAL.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
