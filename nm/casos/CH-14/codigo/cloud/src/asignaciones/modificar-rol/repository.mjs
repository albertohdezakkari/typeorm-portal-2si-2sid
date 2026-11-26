import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function modificarRolRepository(zonaId, jardineroId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { zonaId, jardineroId, rol },
    {
      condition: { attr: 'zonaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
