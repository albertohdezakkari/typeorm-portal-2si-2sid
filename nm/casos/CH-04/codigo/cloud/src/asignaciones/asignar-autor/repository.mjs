import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PUBLICACION } from '../../models/editorial-publicacion.model.mjs';
import { MODELO_AUTOR, MODELO_ASIGNACION } from '../../models/autor-asignacion.model.mjs';

export async function buscarPublicacionRepository(publicacionId) {
  const { Item } = await MODELO_PUBLICACION.build(EntityRepository).get(
    { publicacionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarAutorRepository(autorId) {
  const { Item } = await MODELO_AUTOR.build(EntityRepository).get(
    { autorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarAutorRepository(publicacionId, autorId, rol) {
  const asignacion = { publicacionId, autorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'publicacionId', exists: false } }
  );
  return asignacion;
}
