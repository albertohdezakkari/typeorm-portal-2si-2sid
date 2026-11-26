import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/mecanico-asignacion.model.mjs';

export async function modificarRolRepository(reparacionId, mecanicoId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { reparacionId, mecanicoId, rol },
    {
      condition: { attr: 'reparacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
