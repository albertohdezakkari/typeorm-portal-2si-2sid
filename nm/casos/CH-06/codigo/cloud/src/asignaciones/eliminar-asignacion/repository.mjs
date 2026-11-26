import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/instructor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(sesionId, instructorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { sesionId, instructorId }
  );
}
