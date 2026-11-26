import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TRAYECTO, MODELO_ESTACION } from '../../models/estacion-trayecto.model.mjs';

export async function eliminarTrayectoRepository(trayectoId) {
  await MODELO_TRAYECTO.build(EntityRepository).delete(
    { trayectoId }
  );
}
