import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PISTA, MODELO_COMPLEJO } from '../../models/complejo-pista.model.mjs';

export async function eliminarPistaRepository(pistaId) {
  await MODELO_PISTA.build(EntityRepository).delete(
    { pistaId }
  );
}
