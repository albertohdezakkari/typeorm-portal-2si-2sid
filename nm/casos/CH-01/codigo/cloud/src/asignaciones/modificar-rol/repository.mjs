import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cuidador-asignacion.model.mjs';

export async function modificarRolRepository(animalId, cuidadorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { animalId, cuidadorId, rol },
    {
      condition: { attr: 'animalId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
