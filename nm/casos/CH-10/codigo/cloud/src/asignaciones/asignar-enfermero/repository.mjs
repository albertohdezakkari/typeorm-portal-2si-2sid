import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HABITACION } from '../../models/hospital-habitacion.model.mjs';
import { MODELO_ENFERMERO, MODELO_ASIGNACION } from '../../models/enfermero-asignacion.model.mjs';

export async function buscarHabitacionRepository(habitacionId) {
  const { Item } = await MODELO_HABITACION.build(EntityRepository).get(
    { habitacionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarEnfermeroRepository(enfermeroId) {
  const { Item } = await MODELO_ENFERMERO.build(EntityRepository).get(
    { enfermeroId },
    { consistent: true }
  );
  return Item;
}

export async function asignarEnfermeroRepository(habitacionId, enfermeroId, rol) {
  const asignacion = { habitacionId, enfermeroId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'habitacionId', exists: false } }
  );
  return asignacion;
}
