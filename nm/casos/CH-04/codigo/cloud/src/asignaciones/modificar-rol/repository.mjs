import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/autor-asignacion.model.mjs';

export async function modificarRolRepository(publicacionId, autorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { publicacionId, autorId, rol },
    {
      condition: { attr: 'publicacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
