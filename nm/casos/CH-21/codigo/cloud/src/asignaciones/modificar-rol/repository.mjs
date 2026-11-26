import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/analista-asignacion.model.mjs';

export async function modificarRolRepository(muestraId, analistaId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { muestraId, analistaId, rol },
    {
      condition: { attr: 'muestraId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
