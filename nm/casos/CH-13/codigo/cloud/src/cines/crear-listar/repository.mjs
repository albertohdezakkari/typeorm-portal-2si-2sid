import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_CINE } from '../../models/cine-proyeccion.model.mjs';

export async function crearCineRepository(cine) {
  await MODELO_CINE.build(EntityRepository).put(
    cine,
    { condition: { attr: 'cineId', exists: false } }
  );
}

export async function listarCinesRepository() {
  const { Items = [] } = await MODELO_CINE.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}