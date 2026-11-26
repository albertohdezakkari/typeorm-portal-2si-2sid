import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLANTA, MODELO_VIVERO } from '../../models/vivero-planta.model.mjs';

export async function buscarViveroRepository(viveroId) {
  const { Item } = await MODELO_VIVERO.build(EntityRepository).get(
    { viveroId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarViveroRepository(viveroId, minimo) {
  const { Items = [] } = await MODELO_PLANTA.build(EntityRepository).query(
    { index: 'PorVivero', partition: viveroId },
    { filters: { Planta: { attr: 'alturaCm', gte: minimo } } }
  );
  return Items;
}
