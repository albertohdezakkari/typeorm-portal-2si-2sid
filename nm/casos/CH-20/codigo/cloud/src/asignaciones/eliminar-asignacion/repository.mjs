import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/conductor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(trayectoId, conductorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { trayectoId, conductorId }
  );
}
