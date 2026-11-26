import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARTICULO, MODELO_TIENDA } from '../../models/tienda-articulo.model.mjs';

export async function buscarTiendaRepository(tiendaId) {
  const { Item } = await MODELO_TIENDA.build(EntityRepository).get(
    { tiendaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarTiendaRepository(tiendaId, minimo) {
  const { Items = [] } = await MODELO_ARTICULO.build(EntityRepository).query(
    { index: 'PorTienda', partition: tiendaId },
    { filters: { Articulo: { attr: 'stock', gte: minimo } } }
  );
  return Items;
}
