import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COSECHA, MODELO_GRANJA } from '../../models/granja-cosecha.model.mjs';

export async function eliminarCosechaRepository(cosechaId) {
  await MODELO_COSECHA.build(EntityRepository).delete(
    { cosechaId }
  );
}
