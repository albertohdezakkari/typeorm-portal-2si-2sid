import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LOTE, MODELO_COOPERATIVA } from '../../models/cooperativa-lote.model.mjs';

export async function eliminarLoteRepository(loteId) {
  await MODELO_LOTE.build(EntityRepository).delete(
    { loteId }
  );
}
