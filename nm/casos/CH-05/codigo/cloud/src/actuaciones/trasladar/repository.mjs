import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTUACION, MODELO_FESTIVAL } from '../../models/festival-actuacion.model.mjs';

export async function trasladarActuacionRepository(actuacionId, festivalId) {
  const { Attributes } = await MODELO_ACTUACION.build(EntityRepository).update(
    { actuacionId, festivalId },
    {
      condition: { attr: 'actuacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
