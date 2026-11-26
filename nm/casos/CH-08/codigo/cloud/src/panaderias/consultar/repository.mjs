import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PRODUCTO, MODELO_PANADERIA } from '../../models/panaderia-producto.model.mjs';

export async function buscarPanaderiaRepository(panaderiaId) {
  const { Item } = await MODELO_PANADERIA.build(EntityRepository).get(
    { panaderiaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarPanaderiaRepository(panaderiaId, minimo) {
  const { Items = [] } = await MODELO_PRODUCTO.build(EntityRepository).query(
    { index: 'PorPanaderia', partition: panaderiaId },
    { filters: { Producto: { attr: 'precioCentimos', gte: minimo } } }
  );
  return Items;
}
