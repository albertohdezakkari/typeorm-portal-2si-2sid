import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECCION, MODELO_CINE } from '../../models/cine-proyeccion.model.mjs';

export async function trasladarProyeccionRepository(proyeccionId, cineId) {
  const { Attributes } = await MODELO_PROYECCION.build(EntityRepository).update(
    { proyeccionId, cineId },
    {
      condition: { attr: 'proyeccionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
