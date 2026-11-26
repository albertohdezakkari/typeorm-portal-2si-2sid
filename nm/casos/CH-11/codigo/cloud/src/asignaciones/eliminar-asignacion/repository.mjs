import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/huesped-asignacion.model.mjs';

export async function eliminarAsignacionRepository(reservaId, huespedId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { reservaId, huespedId }
  );
}
