import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMBARCACION, MODELO_PUERTO } from '../../models/puerto-embarcacion.model.mjs';

export async function crearEmbarcacionRepository(embarcacion) {
  await MODELO_EMBARCACION.build(EntityRepository).put(
    embarcacion,
    { condition: { attr: 'embarcacionId', exists: false } }
  );
}

export async function listarEmbarcacionesRepository() {
  const { Items = [] } = await MODELO_EMBARCACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
