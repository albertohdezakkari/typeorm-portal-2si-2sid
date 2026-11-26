import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EXCURSION, MODELO_AGENCIA } from '../../models/agencia-excursion.model.mjs';

export async function eliminarExcursionRepository(excursionId) {
  await MODELO_EXCURSION.build(EntityRepository).delete(
    { excursionId }
  );
}
