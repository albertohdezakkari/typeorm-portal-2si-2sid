import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AULA, MODELO_ESCUELA } from '../../models/escuela-aula.model.mjs';

export async function trasladarAulaRepository(aulaId, escuelaId) {
  const { Attributes } = await MODELO_AULA.build(EntityRepository).update(
    { aulaId, escuelaId },
    {
      condition: { attr: 'aulaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
