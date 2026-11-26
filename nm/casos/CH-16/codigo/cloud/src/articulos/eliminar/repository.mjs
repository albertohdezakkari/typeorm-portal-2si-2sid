import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARTICULO, MODELO_TIENDA } from '../../models/tienda-articulo.model.mjs';

export async function eliminarArticuloRepository(articuloId) {
  await MODELO_ARTICULO.build(EntityRepository).delete(
    { articuloId }
  );
}
