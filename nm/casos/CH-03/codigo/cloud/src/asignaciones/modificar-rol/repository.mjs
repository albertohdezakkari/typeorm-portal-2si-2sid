import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/restaurador-asignacion.model.mjs';

export async function modificarRolRepository(piezaId, restauradorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { piezaId, restauradorId, rol },
    {
      condition: { attr: 'piezaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
