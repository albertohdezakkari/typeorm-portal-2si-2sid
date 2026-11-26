import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/revisor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(documentoId, revisorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { documentoId, revisorId }
  );
}
