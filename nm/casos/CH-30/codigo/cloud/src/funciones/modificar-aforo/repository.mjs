import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_FUNCION, MODELO_TEATRO } from '../../models/teatro-funcion.model.mjs';

export async function modificarAforoRepository(funcionId, aforo) {
  const { Attributes } = await MODELO_FUNCION.build(EntityRepository).update(
    { funcionId, aforo },
    {
      condition: { attr: 'funcionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
