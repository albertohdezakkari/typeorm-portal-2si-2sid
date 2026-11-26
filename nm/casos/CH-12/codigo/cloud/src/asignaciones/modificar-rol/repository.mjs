import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/inspector-asignacion.model.mjs';

export async function modificarRolRepository(loteId, inspectorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { loteId, inspectorId, rol },
    {
      condition: { attr: 'loteId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
