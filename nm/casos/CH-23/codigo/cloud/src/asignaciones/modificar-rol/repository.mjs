import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cocinero-asignacion.model.mjs';

export async function modificarRolRepository(comandaId, cocineroId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { comandaId, cocineroId, rol },
    {
      condition: { attr: 'comandaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
