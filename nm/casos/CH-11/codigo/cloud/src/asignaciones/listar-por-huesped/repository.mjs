import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/huesped-asignacion.model.mjs';

export async function listarAsignacionesPorHuespedRepository(huespedId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorHuesped', partition: huespedId }
  );
  return Items;
}
