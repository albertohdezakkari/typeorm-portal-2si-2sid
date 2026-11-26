import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function eliminarAsignacionRepository(plazaId, tecnicoId) {
  await MODELO_ASIGNACION.build(EntityRepository).delete(
    { plazaId, tecnicoId }
  );
}
