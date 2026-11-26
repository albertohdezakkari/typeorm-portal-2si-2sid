import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARTICULO } from '../../models/tienda-articulo.model.mjs';
import { MODELO_VENDEDOR, MODELO_ASIGNACION } from '../../models/vendedor-asignacion.model.mjs';

export async function buscarArticuloRepository(articuloId) {
  const { Item } = await MODELO_ARTICULO.build(EntityRepository).get(
    { articuloId },
    { consistent: true }
  );
  return Item;
}

export async function buscarVendedorRepository(vendedorId) {
  const { Item } = await MODELO_VENDEDOR.build(EntityRepository).get(
    { vendedorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarVendedorRepository(articuloId, vendedorId, rol) {
  const asignacion = { articuloId, vendedorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'articuloId', exists: false } }
  );
  return asignacion;
}
