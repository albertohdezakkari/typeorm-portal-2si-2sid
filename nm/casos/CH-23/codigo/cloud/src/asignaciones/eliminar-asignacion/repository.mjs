import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cocinero-asignacion.model.mjs';

export async function eliminarAsignacionRepository(comandaId, cocineroId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { comandaId, cocineroId }
  );
}
