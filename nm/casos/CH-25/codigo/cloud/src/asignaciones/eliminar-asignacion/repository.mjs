import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/locutor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(programaId, locutorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { programaId, locutorId }
  );
}
