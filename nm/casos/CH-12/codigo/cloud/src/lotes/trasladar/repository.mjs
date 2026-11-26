import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LOTE, MODELO_COOPERATIVA } from '../../models/cooperativa-lote.model.mjs';

export async function trasladarLoteRepository(loteId, cooperativaId) {
  const { Attributes } = await MODELO_LOTE.build(EntityRepository).update(
    { loteId, cooperativaId },
    {
      condition: { attr: 'loteId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
