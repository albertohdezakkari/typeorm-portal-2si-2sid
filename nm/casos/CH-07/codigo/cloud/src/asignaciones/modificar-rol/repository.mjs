import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/guia-asignacion.model.mjs';

export async function modificarRolRepository(excursionId, guiaId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { excursionId, guiaId, rol },
    {
      condition: { attr: 'excursionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
