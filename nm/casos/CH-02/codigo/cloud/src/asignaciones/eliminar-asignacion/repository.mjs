import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cultivador-asignacion.model.mjs';

export async function eliminarAsignacionRepository(parcelaId, cultivadorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { parcelaId, cultivadorId }
  );
}
