import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function eliminarAsignacionRepository(obraId, profesionalId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { obraId, profesionalId }
  );
}
