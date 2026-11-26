import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COCINERO } from '../../models/cocinero-asignacion.model.mjs';

export async function crearCocineroRepository(cocinero) {
  await MODELO_COCINERO.build(EntityRepository).put(
    cocinero,
    { condition: { attr: 'cocineroId', exists: false } }
  );
}

export async function listarCocinerosRepository() {
  const { Items = [] } = await MODELO_COCINERO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
