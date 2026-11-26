import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function eliminarAsignacionRepository(proyeccionId, tecnicoId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { proyeccionId, tecnicoId }
  );
}
