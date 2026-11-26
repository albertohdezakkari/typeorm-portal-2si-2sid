import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTUACION, MODELO_FESTIVAL } from '../../models/festival-actuacion.model.mjs';

export async function eliminarActuacionRepository(actuacionId) {
  await MODELO_ACTUACION.build(EntityRepository).delete(
    { actuacionId }
  );
}
