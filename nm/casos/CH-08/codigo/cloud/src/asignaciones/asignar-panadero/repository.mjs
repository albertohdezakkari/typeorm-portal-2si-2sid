import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PRODUCTO } from '../../models/panaderia-producto.model.mjs';
import { MODELO_PANADERO, MODELO_ASIGNACION } from '../../models/panadero-asignacion.model.mjs';

export async function buscarProductoRepository(productoId) {
  const { Item } = await MODELO_PRODUCTO.build(EntityRepository).get(
    { productoId },
    { consistent: true }
  );
  return Item;
}

export async function buscarPanaderoRepository(panaderoId) {
  const { Item } = await MODELO_PANADERO.build(EntityRepository).get(
    { panaderoId },
    { consistent: true }
  );
  return Item;
}

export async function asignarPanaderoRepository(productoId, panaderoId, rol) {
  const asignacion = { productoId, panaderoId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'productoId', exists: false } }
  );
  return asignacion;
}
