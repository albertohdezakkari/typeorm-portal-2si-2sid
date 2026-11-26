import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/actor-asignacion.model.mjs';

export async function listarAsignacionesPorActorRepository(actorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorActor', partition: actorId }
  );
  return Items;
}
