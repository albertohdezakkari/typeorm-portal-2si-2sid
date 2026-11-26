import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMBARCACION, MODELO_PUERTO } from '../../models/puerto-embarcacion.model.mjs';

export async function modificarEsloraMetrosRepository(embarcacionId, esloraMetros) {
  const { Attributes } = await MODELO_EMBARCACION.build(EntityRepository).update(
    { embarcacionId, esloraMetros },
    {
      condition: { attr: 'embarcacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
