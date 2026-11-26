import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTIVIDAD, MODELO_CLUB } from '../../models/club-actividad.model.mjs';

export async function eliminarActividadRepository(actividadId) {
  await MODELO_ACTIVIDAD.build(EntityRepository).delete(
    { actividadId }
  );
}
