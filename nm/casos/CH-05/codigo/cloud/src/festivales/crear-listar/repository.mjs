import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_FESTIVAL } from '../../models/festival-actuacion.model.mjs';

export async function crearFestivalRepository(festival) {
  await MODELO_FESTIVAL.build(EntityRepository).put(
    festival,
    { condition: { attr: 'festivalId', exists: false } }
  );
}

export async function listarFestivalesRepository() {
  const { Items = [] } = await MODELO_FESTIVAL.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}