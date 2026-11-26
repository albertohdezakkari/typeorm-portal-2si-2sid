import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTOR } from '../../models/actor-asignacion.model.mjs';

export async function crearActorRepository(actor) {
  await MODELO_ACTOR.build(EntityRepository).put(
    actor,
    { condition: { attr: 'actorId', exists: false } }
  );
}

export async function listarActoresRepository() {
  const { Items = [] } = await MODELO_ACTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
