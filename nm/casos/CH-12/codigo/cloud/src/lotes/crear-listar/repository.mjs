import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LOTE, MODELO_COOPERATIVA } from '../../models/cooperativa-lote.model.mjs';

export async function crearLoteRepository(lote) {
  await MODELO_LOTE.build(EntityRepository).put(
    lote,
    { condition: { attr: 'loteId', exists: false } }
  );
}

export async function listarLotesRepository() {
  const { Items = [] } = await MODELO_LOTE.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
