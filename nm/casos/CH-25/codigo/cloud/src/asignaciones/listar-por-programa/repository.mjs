import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/locutor-asignacion.model.mjs';

export async function listarAsignacionesPorProgramaRepository(programaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: programaId },
    { consistent: true }
  );
  return Items;
}
