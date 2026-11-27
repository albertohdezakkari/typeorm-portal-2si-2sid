import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TEATRO } from '../../models/teatro-funcion.model.mjs';

export async function crearTeatroRepository(teatro) {
  await MODELO_TEATRO.build(EntityRepository).put(
    teatro,
    { condition: { attr: 'teatroId', exists: false } }
  );
}

export async function listarTeatrosRepository() {
  const { Items = [] } = await MODELO_TEATRO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}