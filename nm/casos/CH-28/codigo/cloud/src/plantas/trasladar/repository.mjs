import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLANTA, MODELO_VIVERO } from '../../models/vivero-planta.model.mjs';

export async function trasladarPlantaRepository(plantaId, viveroId) {
  const { Attributes } = await MODELO_PLANTA.build(EntityRepository).update(
    { plantaId, viveroId },
    {
      condition: { attr: 'plantaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
