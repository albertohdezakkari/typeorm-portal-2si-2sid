import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROGRAMA, MODELO_EMISORA } from '../../models/emisora-programa.model.mjs';

export async function modificarDuracionMinutosRepository(programaId, duracionMinutos) {
  const { Attributes } = await MODELO_PROGRAMA.build(EntityRepository).update(
    { programaId, duracionMinutos },
    {
      condition: { attr: 'programaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
