import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REPARACION, MODELO_TALLER } from '../../models/taller-reparacion.model.mjs';

export async function trasladarReparacionRepository(reparacionId, tallerId) {
  const { Attributes } = await MODELO_REPARACION.build(EntityRepository).update(
    { reparacionId, tallerId },
    {
      condition: { attr: 'reparacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
