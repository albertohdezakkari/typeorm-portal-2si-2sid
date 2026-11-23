import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO } from '../../models/ayuntamiento-obra.model.mjs';

export async function modificarPresupuestoEurosRepository(obraId, presupuestoEuros) {
  const { Attributes } = await MODELO_OBRA.build(EntityRepository).update(
    { obraId, presupuestoEuros },
    {
      condition: { attr: 'obraId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
