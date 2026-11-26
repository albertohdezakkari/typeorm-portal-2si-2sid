import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function eliminarAsignacionRepository(plantaId, jardineroId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { plantaId, jardineroId }
  );
}
