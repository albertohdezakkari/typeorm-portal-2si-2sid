import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COMANDA, MODELO_CAFETERIA } from '../../models/cafeteria-comanda.model.mjs';

export async function buscarCafeteriaRepository(cafeteriaId) {
  const { Item } = await MODELO_CAFETERIA.build(EntityRepository).get(
    { cafeteriaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarCafeteriaRepository(cafeteriaId, minimo) {
  const { Items = [] } = await MODELO_COMANDA.build(EntityRepository).query(
    { index: 'PorCafeteria', partition: cafeteriaId },
    { filters: { Comanda: { attr: 'importeCentimos', gte: minimo } } }
  );
  return Items;
}
