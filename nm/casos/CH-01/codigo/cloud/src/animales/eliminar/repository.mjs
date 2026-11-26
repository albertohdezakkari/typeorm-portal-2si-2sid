import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ANIMAL, MODELO_REFUGIO } from '../../models/refugio-animal.model.mjs';

export async function eliminarAnimalRepository(animalId) {
  await MODELO_ANIMAL.build(EntityRepository).delete(
    { animalId }
  );
}
