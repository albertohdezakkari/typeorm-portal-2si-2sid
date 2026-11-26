import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HABITACION, MODELO_HOSPITAL } from '../../models/hospital-habitacion.model.mjs';

export async function trasladarHabitacionRepository(habitacionId, hospitalId) {
  const { Attributes } = await MODELO_HABITACION.build(EntityRepository).update(
    { habitacionId, hospitalId },
    {
      condition: { attr: 'habitacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
