import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PIEZA, MODELO_MUSEO } from '../../models/museo-pieza.model.mjs';

export async function modificarAntiguedadAniosRepository(piezaId, antiguedadAnios) {
  const { Attributes } = await MODELO_PIEZA.build(EntityRepository).update(
    { piezaId, antiguedadAnios },
    {
      condition: { attr: 'piezaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
