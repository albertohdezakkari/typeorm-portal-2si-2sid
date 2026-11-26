import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/artista-asignacion.model.mjs';

export async function eliminarAsignacionRepository(actuacionId, artistaId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { actuacionId, artistaId }
  );
}
