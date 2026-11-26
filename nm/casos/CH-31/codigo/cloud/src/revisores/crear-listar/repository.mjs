import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REVISOR } from '../../models/revisor-asignacion.model.mjs';

export async function crearRevisorRepository(revisor) {
  await MODELO_REVISOR.build(EntityRepository).put(
    revisor,
    { condition: { attr: 'revisorId', exists: false } }
  );
}

export async function listarRevisoresRepository() {
  const { Items = [] } = await MODELO_REVISOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
