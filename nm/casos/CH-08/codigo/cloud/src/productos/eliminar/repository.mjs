import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PRODUCTO, MODELO_PANADERIA } from '../../models/panaderia-producto.model.mjs';

export async function eliminarProductoRepository(productoId) {
  await MODELO_PRODUCTO.build(EntityRepository).delete(
    { productoId }
  );
}
