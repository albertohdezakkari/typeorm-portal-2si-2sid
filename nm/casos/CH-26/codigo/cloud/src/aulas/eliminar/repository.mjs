import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AULA, MODELO_ESCUELA } from '../../models/escuela-aula.model.mjs';

export async function eliminarAulaRepository(aulaId) {
  await MODELO_AULA.build(EntityRepository).delete(
    { aulaId }
  );
}
