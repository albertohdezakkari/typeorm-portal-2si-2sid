import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESCENA } from '../../models/estudio-escena.model.mjs';
import { MODELO_ACTOR, MODELO_ASIGNACION } from '../../models/actor-asignacion.model.mjs';

export async function buscarEscenaRepository(escenaId) {
  const { Item } = await MODELO_ESCENA.build(EntityRepository).get(
    { escenaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarActorRepository(actorId) {
  const { Item } = await MODELO_ACTOR.build(EntityRepository).get(
    { actorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarActorRepository(escenaId, actorId, rol) {
  const asignacion = { escenaId, actorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'escenaId', exists: false } }
  );
  return asignacion;
}
