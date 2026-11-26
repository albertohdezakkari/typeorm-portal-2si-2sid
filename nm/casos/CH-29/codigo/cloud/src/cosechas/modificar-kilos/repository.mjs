import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COSECHA, MODELO_GRANJA } from '../../models/granja-cosecha.model.mjs';

export async function modificarKilosRepository(cosechaId, kilos) {
  const { Attributes } = await MODELO_COSECHA.build(EntityRepository).update(
    { cosechaId, kilos },
    {
      condition: { attr: 'cosechaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
