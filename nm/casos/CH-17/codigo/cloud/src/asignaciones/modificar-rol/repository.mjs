import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/actor-asignacion.model.mjs';

export async function modificarRolRepository(escenaId, actorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { escenaId, actorId, rol },
    {
      condition: { attr: 'escenaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
