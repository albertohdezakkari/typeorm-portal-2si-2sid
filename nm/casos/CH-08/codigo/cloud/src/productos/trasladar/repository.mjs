import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PRODUCTO, MODELO_PANADERIA } from '../../models/panaderia-producto.model.mjs';

export async function trasladarProductoRepository(productoId, panaderiaId) {
  const { Attributes } = await MODELO_PRODUCTO.build(EntityRepository).update(
    { productoId, panaderiaId },
    {
      condition: { attr: 'productoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
