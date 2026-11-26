import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/conductor-asignacion.model.mjs';

export async function modificarRolRepository(trayectoId, conductorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { trayectoId, conductorId, rol },
    {
      condition: { attr: 'trayectoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
