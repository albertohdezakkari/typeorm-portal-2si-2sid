import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESCENA, MODELO_ESTUDIO } from '../../models/estudio-escena.model.mjs';

export async function trasladarEscenaRepository(escenaId, estudioId) {
  const { Attributes } = await MODELO_ESCENA.build(EntityRepository).update(
    { escenaId, estudioId },
    {
      condition: { attr: 'escenaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
