import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_CLUB } from '../../models/club-actividad.model.mjs';

export async function crearClubRepository(club) {
  await MODELO_CLUB.build(EntityRepository).put(
    club,
    { condition: { attr: 'clubId', exists: false } }
  );
}

export async function listarClubesRepository() {
  const { Items = [] } = await MODELO_CLUB.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}