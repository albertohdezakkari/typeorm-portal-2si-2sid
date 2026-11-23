import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO } from '../../models/ayuntamiento-obra.model.mjs';

export async function trasladarObraRepository(obraId, ayuntamientoId) {
  const { Attributes } = await MODELO_OBRA.build(EntityRepository).update(
    { obraId, ayuntamientoId },
    {
      condition: { attr: 'obraId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
