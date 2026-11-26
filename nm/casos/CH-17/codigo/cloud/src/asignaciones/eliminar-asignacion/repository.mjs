import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/actor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(escenaId, actorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { escenaId, actorId }
  );
}
