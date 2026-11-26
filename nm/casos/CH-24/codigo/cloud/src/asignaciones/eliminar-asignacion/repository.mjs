import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/entrenador-asignacion.model.mjs';

export async function eliminarAsignacionRepository(pistaId, entrenadorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { pistaId, entrenadorId }
  );
}
