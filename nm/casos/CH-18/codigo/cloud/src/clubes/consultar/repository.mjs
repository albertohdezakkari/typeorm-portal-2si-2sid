import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTIVIDAD, MODELO_CLUB } from '../../models/club-actividad.model.mjs';

export async function buscarClubRepository(clubId) {
  const { Item } = await MODELO_CLUB.build(EntityRepository).get(
    { clubId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarClubRepository(clubId, minimo) {
  const { Items = [] } = await MODELO_ACTIVIDAD.build(EntityRepository).query(
    { index: 'PorClub', partition: clubId },
    { filters: { Actividad: { attr: 'plazas', gte: minimo } } }
  );
  return Items;
}
