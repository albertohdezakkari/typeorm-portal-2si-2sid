import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HABITACION, MODELO_HOSPITAL } from '../../models/hospital-habitacion.model.mjs';

export async function crearHabitacionRepository(habitacion) {
  await MODELO_HABITACION.build(EntityRepository).put(
    habitacion,
    { condition: { attr: 'habitacionId', exists: false } }
  );
}

export async function listarHabitacionesRepository() {
  const { Items = [] } = await MODELO_HABITACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
