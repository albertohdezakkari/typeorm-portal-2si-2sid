import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tripulante-asignacion.model.mjs';

export async function modificarRolRepository(embarcacionId, tripulanteId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { embarcacionId, tripulanteId, rol },
    {
      condition: { attr: 'embarcacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
