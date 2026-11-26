import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PARCELA, MODELO_HUERTO } from '../../models/huerto-parcela.model.mjs';

export async function modificarSuperficieRepository(parcelaId, superficieM2) {
  const { Attributes } = await MODELO_PARCELA.build(EntityRepository).update(
    { parcelaId, superficieM2 },
    {
      condition: { attr: 'parcelaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
