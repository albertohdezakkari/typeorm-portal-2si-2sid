import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/agricultor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(cosechaId, agricultorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { cosechaId, agricultorId }
  );
}
