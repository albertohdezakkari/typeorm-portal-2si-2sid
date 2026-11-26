import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ANIMAL, MODELO_REFUGIO } from '../../models/refugio-animal.model.mjs';

export async function modificarEdadMesesRepository(animalId, edadMeses) {
  const { Attributes } = await MODELO_ANIMAL.build(EntityRepository).update(
    { animalId, edadMeses },
    {
      condition: { attr: 'animalId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
