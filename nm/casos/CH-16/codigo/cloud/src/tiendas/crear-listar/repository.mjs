import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TIENDA } from '../../models/tienda-articulo.model.mjs';

export async function crearTiendaRepository(tienda) {
  await MODELO_TIENDA.build(EntityRepository).put(
    tienda,
    { condition: { attr: 'tiendaId', exists: false } }
  );
}

export async function listarTiendasRepository() {
  const { Items = [] } = await MODELO_TIENDA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}