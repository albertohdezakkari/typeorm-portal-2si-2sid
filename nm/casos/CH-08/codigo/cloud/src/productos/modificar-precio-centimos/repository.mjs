import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PRODUCTO, MODELO_PANADERIA } from '../../models/panaderia-producto.model.mjs';

export async function modificarPrecioCentimosRepository(productoId, precioCentimos) {
  const { Attributes } = await MODELO_PRODUCTO.build(EntityRepository).update(
    { productoId, precioCentimos },
    {
      condition: { attr: 'productoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
