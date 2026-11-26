import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTUACION, MODELO_FESTIVAL } from '../../models/festival-actuacion.model.mjs';

export async function buscarFestivalRepository(festivalId) {
  const { Item } = await MODELO_FESTIVAL.build(EntityRepository).get(
    { festivalId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarFestivalRepository(festivalId, minimo) {
  const { Items = [] } = await MODELO_ACTUACION.build(EntityRepository).query(
    { index: 'PorFestival', partition: festivalId },
    { filters: { Actuacion: { attr: 'duracionMinutos', gte: minimo } } }
  );
  return Items;
}
