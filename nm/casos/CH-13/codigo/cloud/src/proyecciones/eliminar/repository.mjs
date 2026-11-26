import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECCION, MODELO_CINE } from '../../models/cine-proyeccion.model.mjs';

export async function eliminarProyeccionRepository(proyeccionId) {
  await MODELO_PROYECCION.build(EntityRepository).delete(
    { proyeccionId }
  );
}
