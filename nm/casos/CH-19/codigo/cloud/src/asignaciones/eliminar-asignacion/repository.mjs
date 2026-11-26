import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tripulante-asignacion.model.mjs';

export async function eliminarAsignacionRepository(embarcacionId, tripulanteId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { embarcacionId, tripulanteId }
  );
}
