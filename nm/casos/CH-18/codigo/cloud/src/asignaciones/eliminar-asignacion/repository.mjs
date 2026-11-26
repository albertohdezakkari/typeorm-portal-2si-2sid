import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/monitor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(actividadId, monitorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { actividadId, monitorId }
  );
}
