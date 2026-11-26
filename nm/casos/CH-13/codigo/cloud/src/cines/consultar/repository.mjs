import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECCION, MODELO_CINE } from '../../models/cine-proyeccion.model.mjs';

export async function buscarCineRepository(cineId) {
  const { Item } = await MODELO_CINE.build(EntityRepository).get(
    { cineId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarCineRepository(cineId, minimo) {
  const { Items = [] } = await MODELO_PROYECCION.build(EntityRepository).query(
    { index: 'PorCine', partition: cineId },
    { filters: { Proyeccion: { attr: 'duracionMinutos', gte: minimo } } }
  );
  return Items;
}
