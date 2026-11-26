import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EXCURSION, MODELO_AGENCIA } from '../../models/agencia-excursion.model.mjs';

export async function modificarDuracionHorasRepository(excursionId, duracionHoras) {
  const { Attributes } = await MODELO_EXCURSION.build(EntityRepository).update(
    { excursionId, duracionHoras },
    {
      condition: { attr: 'excursionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
