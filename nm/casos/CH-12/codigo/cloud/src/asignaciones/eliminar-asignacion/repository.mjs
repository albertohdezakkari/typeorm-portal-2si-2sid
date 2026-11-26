import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/inspector-asignacion.model.mjs';

export async function eliminarAsignacionRepository(loteId, inspectorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { loteId, inspectorId }
  );
}
