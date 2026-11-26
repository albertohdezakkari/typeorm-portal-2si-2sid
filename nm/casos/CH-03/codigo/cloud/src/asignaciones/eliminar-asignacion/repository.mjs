import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/restaurador-asignacion.model.mjs';

export async function eliminarAsignacionRepository(piezaId, restauradorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { piezaId, restauradorId }
  );
}
