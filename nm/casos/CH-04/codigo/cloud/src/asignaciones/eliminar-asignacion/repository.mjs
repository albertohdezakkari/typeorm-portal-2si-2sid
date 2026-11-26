import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/autor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(publicacionId, autorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { publicacionId, autorId }
  );
}
