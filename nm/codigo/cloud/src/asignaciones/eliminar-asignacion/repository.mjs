import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function eliminarAsignacionRepository(obraId, profesionalId) {
  await MODELO_ASIGNACION.build(DeleteItemCommand)
    .key({ obraId, profesionalId })
    .send();
}
