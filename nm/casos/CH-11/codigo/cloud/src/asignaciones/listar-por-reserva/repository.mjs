import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/huesped-asignacion.model.mjs';

export async function listarAsignacionesPorReservaRepository(reservaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: reservaId },
    { consistent: true }
  );
  return Items;
}
