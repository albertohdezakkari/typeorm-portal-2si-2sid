import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_INSTRUCTOR } from '../../models/instructor-asignacion.model.mjs';

export async function crearInstructorRepository(instructor) {
  await MODELO_INSTRUCTOR.build(EntityRepository).put(
    instructor,
    { condition: { attr: 'instructorId', exists: false } }
  );
}

export async function listarInstructoresRepository() {
  const { Items = [] } = await MODELO_INSTRUCTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
