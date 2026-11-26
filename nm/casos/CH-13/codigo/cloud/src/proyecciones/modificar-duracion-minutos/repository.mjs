import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECCION, MODELO_CINE } from '../../models/cine-proyeccion.model.mjs';

export async function modificarDuracionMinutosRepository(proyeccionId, duracionMinutos) {
  const { Attributes } = await MODELO_PROYECCION.build(EntityRepository).update(
    { proyeccionId, duracionMinutos },
    {
      condition: { attr: 'proyeccionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
