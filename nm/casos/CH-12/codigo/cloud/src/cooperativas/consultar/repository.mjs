import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LOTE, MODELO_COOPERATIVA } from '../../models/cooperativa-lote.model.mjs';

export async function buscarCooperativaRepository(cooperativaId) {
  const { Item } = await MODELO_COOPERATIVA.build(EntityRepository).get(
    { cooperativaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarCooperativaRepository(cooperativaId, minimo) {
  const { Items = [] } = await MODELO_LOTE.build(EntityRepository).query(
    { index: 'PorCooperativa', partition: cooperativaId },
    { filters: { Lote: { attr: 'kilos', gte: minimo } } }
  );
  return Items;
}
