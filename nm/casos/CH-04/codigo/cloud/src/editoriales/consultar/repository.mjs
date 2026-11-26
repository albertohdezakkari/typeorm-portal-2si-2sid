import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PUBLICACION, MODELO_EDITORIAL } from '../../models/editorial-publicacion.model.mjs';

export async function buscarEditorialRepository(editorialId) {
  const { Item } = await MODELO_EDITORIAL.build(EntityRepository).get(
    { editorialId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarEditorialRepository(editorialId, minimo) {
  const { Items = [] } = await MODELO_PUBLICACION.build(EntityRepository).query(
    { index: 'PorEditorial', partition: editorialId },
    { filters: { Publicacion: { attr: 'paginas', gte: minimo } } }
  );
  return Items;
}
