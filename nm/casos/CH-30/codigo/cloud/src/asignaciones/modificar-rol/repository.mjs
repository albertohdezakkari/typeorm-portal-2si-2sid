import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/interprete-asignacion.model.mjs';

export async function modificarRolRepository(funcionId, interpreteId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { funcionId, interpreteId, rol },
    {
      condition: { attr: 'funcionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
