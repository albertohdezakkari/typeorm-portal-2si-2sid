import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HUESPED } from '../../models/huesped-asignacion.model.mjs';

export async function crearHuespedRepository(huesped) {
  await MODELO_HUESPED.build(EntityRepository).put(
    huesped,
    { condition: { attr: 'huespedId', exists: false } }
  );
}

export async function listarHuespedesRepository() {
  const { Items = [] } = await MODELO_HUESPED.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
