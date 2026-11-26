import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/monitor-asignacion.model.mjs';

export async function modificarRolRepository(actividadId, monitorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { actividadId, monitorId, rol },
    {
      condition: { attr: 'actividadId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
