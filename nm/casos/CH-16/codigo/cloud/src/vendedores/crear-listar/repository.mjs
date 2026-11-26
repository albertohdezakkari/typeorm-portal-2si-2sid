import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_VENDEDOR } from '../../models/vendedor-asignacion.model.mjs';

export async function crearVendedorRepository(vendedor) {
  await MODELO_VENDEDOR.build(EntityRepository).put(
    vendedor,
    { condition: { attr: 'vendedorId', exists: false } }
  );
}

export async function listarVendedoresRepository() {
  const { Items = [] } = await MODELO_VENDEDOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
