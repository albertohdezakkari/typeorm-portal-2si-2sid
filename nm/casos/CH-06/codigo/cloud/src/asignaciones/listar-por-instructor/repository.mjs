import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/instructor-asignacion.model.mjs';

export async function listarAsignacionesPorInstructorRepository(instructorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorInstructor', partition: instructorId }
  );
  return Items;
}
