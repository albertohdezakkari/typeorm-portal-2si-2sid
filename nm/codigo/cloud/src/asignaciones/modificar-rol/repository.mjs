import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function modificarRolRepository(obraId, profesionalId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { obraId, profesionalId, rol },
    {
      condition: { attr: 'obraId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
