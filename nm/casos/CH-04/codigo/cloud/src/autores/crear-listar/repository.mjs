import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AUTOR } from '../../models/autor-asignacion.model.mjs';

export async function crearAutorRepository(autor) {
  await MODELO_AUTOR.build(EntityRepository).put(
    autor,
    { condition: { attr: 'autorId', exists: false } }
  );
}

export async function listarAutoresRepository() {
  const { Items = [] } = await MODELO_AUTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
