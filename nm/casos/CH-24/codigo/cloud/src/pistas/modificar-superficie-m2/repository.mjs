import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PISTA, MODELO_COMPLEJO } from '../../models/complejo-pista.model.mjs';

export async function modificarSuperficieM2Repository(pistaId, superficieM2) {
  const { Attributes } = await MODELO_PISTA.build(EntityRepository).update(
    { pistaId, superficieM2 },
    {
      condition: { attr: 'pistaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
