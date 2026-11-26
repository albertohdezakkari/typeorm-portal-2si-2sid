import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COSECHA, MODELO_GRANJA } from '../../models/granja-cosecha.model.mjs';

export async function buscarGranjaRepository(granjaId) {
  const { Item } = await MODELO_GRANJA.build(EntityRepository).get(
    { granjaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarGranjaRepository(granjaId, minimo) {
  const { Items = [] } = await MODELO_COSECHA.build(EntityRepository).query(
    { index: 'PorGranja', partition: granjaId },
    { filters: { Cosecha: { attr: 'kilos', gte: minimo } } }
  );
  return Items;
}
