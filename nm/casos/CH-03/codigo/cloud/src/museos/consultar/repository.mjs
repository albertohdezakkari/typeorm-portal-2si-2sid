import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PIEZA, MODELO_MUSEO } from '../../models/museo-pieza.model.mjs';

export async function buscarMuseoRepository(museoId) {
  const { Item } = await MODELO_MUSEO.build(EntityRepository).get(
    { museoId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarMuseoRepository(museoId, minimo) {
  const { Items = [] } = await MODELO_PIEZA.build(EntityRepository).query(
    { index: 'PorMuseo', partition: museoId },
    { filters: { Pieza: { attr: 'antiguedadAnios', gte: minimo } } }
  );
  return Items;
}
