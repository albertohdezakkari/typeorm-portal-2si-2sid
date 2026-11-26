import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EXCURSION, MODELO_AGENCIA } from '../../models/agencia-excursion.model.mjs';

export async function crearExcursionRepository(excursion) {
  await MODELO_EXCURSION.build(EntityRepository).put(
    excursion,
    { condition: { attr: 'excursionId', exists: false } }
  );
}

export async function listarExcursionesRepository() {
  const { Items = [] } = await MODELO_EXCURSION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
