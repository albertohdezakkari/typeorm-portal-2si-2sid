import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/vendedor-asignacion.model.mjs';

export async function eliminarAsignacionRepository(articuloId, vendedorId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { articuloId, vendedorId }
  );
}
