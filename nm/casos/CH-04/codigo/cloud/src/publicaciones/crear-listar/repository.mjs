import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PUBLICACION, MODELO_EDITORIAL } from '../../models/editorial-publicacion.model.mjs';

export async function crearPublicacionRepository(publicacion) {
  await MODELO_PUBLICACION.build(EntityRepository).put(
    publicacion,
    { condition: { attr: 'publicacionId', exists: false } }
  );
}

export async function listarPublicacionesRepository() {
  const { Items = [] } = await MODELO_PUBLICACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
