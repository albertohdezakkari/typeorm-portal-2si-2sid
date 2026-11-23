import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO } from '../../models/ayuntamiento-obra.model.mjs';

export async function eliminarObraRepository(obraId) {
  await MODELO_OBRA.build(EntityRepository).delete(
    { obraId }
  );
}
