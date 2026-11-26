import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/entrenador-asignacion.model.mjs';

export async function modificarRolRepository(pistaId, entrenadorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { pistaId, entrenadorId, rol },
    {
      condition: { attr: 'pistaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
