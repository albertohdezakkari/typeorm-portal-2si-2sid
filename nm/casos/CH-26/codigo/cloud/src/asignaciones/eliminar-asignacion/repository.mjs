import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/docente-asignacion.model.mjs';

export async function eliminarAsignacionRepository(aulaId, docenteId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { aulaId, docenteId }
  );
}
