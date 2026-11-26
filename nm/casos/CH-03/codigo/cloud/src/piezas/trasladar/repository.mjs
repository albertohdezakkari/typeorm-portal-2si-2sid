import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PIEZA, MODELO_MUSEO } from '../../models/museo-pieza.model.mjs';

export async function trasladarPiezaRepository(piezaId, museoId) {
  const { Attributes } = await MODELO_PIEZA.build(EntityRepository).update(
    { piezaId, museoId },
    {
      condition: { attr: 'piezaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
