import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECTO, MODELO_EMPRESA } from '../../models/empresa-proyecto.model.mjs';

export async function eliminarProyectoRepository(proyectoId) {
  await MODELO_PROYECTO.build(EntityRepository).delete(
    { proyectoId }
  );
}
