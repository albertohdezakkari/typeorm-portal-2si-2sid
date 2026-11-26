import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/artista-asignacion.model.mjs';

export async function modificarRolRepository(actuacionId, artistaId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { actuacionId, artistaId, rol },
    {
      condition: { attr: 'actuacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
