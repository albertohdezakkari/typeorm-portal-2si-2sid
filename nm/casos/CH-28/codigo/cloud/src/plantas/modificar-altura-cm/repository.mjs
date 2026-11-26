import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLANTA, MODELO_VIVERO } from '../../models/vivero-planta.model.mjs';

export async function modificarAlturaCmRepository(plantaId, alturaCm) {
  const { Attributes } = await MODELO_PLANTA.build(EntityRepository).update(
    { plantaId, alturaCm },
    {
      condition: { attr: 'plantaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
