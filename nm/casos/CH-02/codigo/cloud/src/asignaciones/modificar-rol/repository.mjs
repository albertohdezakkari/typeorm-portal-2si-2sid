import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cultivador-asignacion.model.mjs';

export async function modificarRolRepository(parcelaId, cultivadorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { parcelaId, cultivadorId, rol },
    {
      condition: { attr: 'parcelaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
