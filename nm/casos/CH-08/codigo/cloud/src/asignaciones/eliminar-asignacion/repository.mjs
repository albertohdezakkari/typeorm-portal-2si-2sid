import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/panadero-asignacion.model.mjs';

export async function eliminarAsignacionRepository(productoId, panaderoId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { productoId, panaderoId }
  );
}
