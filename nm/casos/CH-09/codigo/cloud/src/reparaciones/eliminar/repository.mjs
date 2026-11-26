import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REPARACION, MODELO_TALLER } from '../../models/taller-reparacion.model.mjs';

export async function eliminarReparacionRepository(reparacionId) {
  await MODELO_REPARACION.build(EntityRepository).delete(
    { reparacionId }
  );
}
