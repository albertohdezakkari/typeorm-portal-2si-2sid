import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/instructor-asignacion.model.mjs';

export async function modificarRolRepository(sesionId, instructorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { sesionId, instructorId, rol },
    {
      condition: { attr: 'sesionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
