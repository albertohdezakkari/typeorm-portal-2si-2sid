import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function eliminarAsignacionRepository(zonaId, jardineroId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { zonaId, jardineroId }
  );
}
