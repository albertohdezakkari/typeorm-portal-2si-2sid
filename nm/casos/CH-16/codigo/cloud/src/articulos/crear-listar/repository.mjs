import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARTICULO, MODELO_TIENDA } from '../../models/tienda-articulo.model.mjs';

export async function crearArticuloRepository(articulo) {
  await MODELO_ARTICULO.build(EntityRepository).put(
    articulo,
    { condition: { attr: 'articuloId', exists: false } }
  );
}

export async function listarArticulosRepository() {
  const { Items = [] } = await MODELO_ARTICULO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
