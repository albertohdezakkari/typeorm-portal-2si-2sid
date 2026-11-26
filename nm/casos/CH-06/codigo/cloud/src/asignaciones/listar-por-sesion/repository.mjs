import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/instructor-asignacion.model.mjs';

export async function listarAsignacionesPorSesionRepository(sesionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: sesionId },
    { consistent: true }
  );
  return Items;
}
