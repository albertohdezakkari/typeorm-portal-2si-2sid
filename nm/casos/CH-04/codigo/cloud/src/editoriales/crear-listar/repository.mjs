import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EDITORIAL } from '../../models/editorial-publicacion.model.mjs';

export async function crearEditorialRepository(editorial) {
  await MODELO_EDITORIAL.build(EntityRepository).put(
    editorial,
    { condition: { attr: 'editorialId', exists: false } }
  );
}

export async function listarEditorialesRepository() {
  const { Items = [] } = await MODELO_EDITORIAL.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}