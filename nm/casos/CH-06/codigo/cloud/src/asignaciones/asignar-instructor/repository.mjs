import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_SESION } from '../../models/gimnasio-sesion.model.mjs';
import { MODELO_INSTRUCTOR, MODELO_ASIGNACION } from '../../models/instructor-asignacion.model.mjs';

export async function buscarSesionRepository(sesionId) {
  const { Item } = await MODELO_SESION.build(EntityRepository).get(
    { sesionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarInstructorRepository(instructorId) {
  const { Item } = await MODELO_INSTRUCTOR.build(EntityRepository).get(
    { instructorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarInstructorRepository(sesionId, instructorId, rol) {
  const asignacion = { sesionId, instructorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'sesionId', exists: false } }
  );
  return asignacion;
}
