import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/conductor-asignacion.model.mjs';

export async function listarAsignacionesPorConductorRepository(conductorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorConductor', partition: conductorId }
  );
  return Items;
}
