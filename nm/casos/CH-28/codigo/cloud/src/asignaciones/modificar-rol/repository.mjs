import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function modificarRolRepository(plantaId, jardineroId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { plantaId, jardineroId, rol },
    {
      condition: { attr: 'plantaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
