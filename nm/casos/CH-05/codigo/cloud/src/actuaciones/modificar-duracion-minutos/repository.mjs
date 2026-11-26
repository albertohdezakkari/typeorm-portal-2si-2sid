import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTUACION, MODELO_FESTIVAL } from '../../models/festival-actuacion.model.mjs';

export async function modificarDuracionMinutosRepository(actuacionId, duracionMinutos) {
  const { Attributes } = await MODELO_ACTUACION.build(EntityRepository).update(
    { actuacionId, duracionMinutos },
    {
      condition: { attr: 'actuacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
