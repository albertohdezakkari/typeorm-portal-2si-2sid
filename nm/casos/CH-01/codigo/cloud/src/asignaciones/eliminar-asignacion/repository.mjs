import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cuidador-asignacion.model.mjs';

export async function eliminarAsignacionRepository(animalId, cuidadorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { animalId, cuidadorId }
  );
}
