import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/locutor-asignacion.model.mjs';

export async function modificarRolRepository(programaId, locutorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { programaId, locutorId, rol },
    {
      condition: { attr: 'programaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
