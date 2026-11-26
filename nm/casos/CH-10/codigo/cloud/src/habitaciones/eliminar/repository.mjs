import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HABITACION, MODELO_HOSPITAL } from '../../models/hospital-habitacion.model.mjs';

export async function eliminarHabitacionRepository(habitacionId) {
  await MODELO_HABITACION.build(EntityRepository).delete(
    { habitacionId }
  );
}
