import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COOPERATIVA } from '../../models/cooperativa-lote.model.mjs';

export async function crearCooperativaRepository(cooperativa) {
  await MODELO_COOPERATIVA.build(EntityRepository).put(
    cooperativa,
    { condition: { attr: 'cooperativaId', exists: false } }
  );
}

export async function listarCooperativasRepository() {
  const { Items = [] } = await MODELO_COOPERATIVA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}