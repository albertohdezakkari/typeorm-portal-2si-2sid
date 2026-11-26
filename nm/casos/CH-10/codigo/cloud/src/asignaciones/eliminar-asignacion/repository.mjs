import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/enfermero-asignacion.model.mjs';

export async function eliminarAsignacionRepository(habitacionId, enfermeroId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { habitacionId, enfermeroId }
  );
}
