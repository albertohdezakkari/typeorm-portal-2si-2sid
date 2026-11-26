import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_SESION, MODELO_GIMNASIO } from '../../models/gimnasio-sesion.model.mjs';

export async function eliminarSesionRepository(sesionId) {
  await MODELO_SESION.build(EntityRepository).delete(
    { sesionId }
  );
}
