import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/mecanico-asignacion.model.mjs';

export async function eliminarAsignacionRepository(reparacionId, mecanicoId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { reparacionId, mecanicoId }
  );
}
