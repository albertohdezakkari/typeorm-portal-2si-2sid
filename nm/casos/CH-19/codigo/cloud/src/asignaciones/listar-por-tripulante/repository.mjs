import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tripulante-asignacion.model.mjs';

export async function listarAsignacionesPorTripulanteRepository(tripulanteId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorTripulante', partition: tripulanteId }
  );
  return Items;
}
