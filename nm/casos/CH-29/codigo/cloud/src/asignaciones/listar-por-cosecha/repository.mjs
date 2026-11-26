import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/agricultor-asignacion.model.mjs';

export async function listarAsignacionesPorCosechaRepository(cosechaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: cosechaId },
    { consistent: true }
  );
  return Items;
}
