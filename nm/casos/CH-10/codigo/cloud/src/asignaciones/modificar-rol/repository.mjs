import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/enfermero-asignacion.model.mjs';

export async function modificarRolRepository(habitacionId, enfermeroId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { habitacionId, enfermeroId, rol },
    {
      condition: { attr: 'habitacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
