import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PRODUCTO, MODELO_PANADERIA } from '../../models/panaderia-producto.model.mjs';

export async function crearProductoRepository(producto) {
  await MODELO_PRODUCTO.build(EntityRepository).put(
    producto,
    { condition: { attr: 'productoId', exists: false } }
  );
}

export async function listarProductosRepository() {
  const { Items = [] } = await MODELO_PRODUCTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
