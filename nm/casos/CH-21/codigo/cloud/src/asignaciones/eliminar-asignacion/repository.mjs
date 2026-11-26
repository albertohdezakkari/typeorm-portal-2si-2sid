import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/analista-asignacion.model.mjs';

export async function eliminarAsignacionRepository(muestraId, analistaId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { muestraId, analistaId }
  );
}
