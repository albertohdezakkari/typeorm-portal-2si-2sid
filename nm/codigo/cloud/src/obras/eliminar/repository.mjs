import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO, TABLA_OBRAS } from '../../models/ayuntamiento-obra.model.mjs';

export async function eliminarObraRepository(obraId) {
  await MODELO_OBRA.build(DeleteItemCommand)
    .key({ obraId })
    .send();
}
