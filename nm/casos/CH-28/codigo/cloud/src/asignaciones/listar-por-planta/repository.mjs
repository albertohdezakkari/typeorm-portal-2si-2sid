import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function listarAsignacionesPorPlantaRepository(plantaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: plantaId },
    { consistent: true }
  );
  return Items;
}
