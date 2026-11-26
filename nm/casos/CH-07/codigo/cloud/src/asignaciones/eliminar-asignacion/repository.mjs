import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/guia-asignacion.model.mjs';

export async function eliminarAsignacionRepository(excursionId, guiaId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { excursionId, guiaId }
  );
}
