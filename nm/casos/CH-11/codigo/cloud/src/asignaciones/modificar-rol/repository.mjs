import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/huesped-asignacion.model.mjs';

export async function modificarRolRepository(reservaId, huespedId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { reservaId, huespedId, rol },
    {
      condition: { attr: 'reservaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
