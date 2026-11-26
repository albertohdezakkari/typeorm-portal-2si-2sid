import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESCENA, MODELO_ESTUDIO } from '../../models/estudio-escena.model.mjs';

export async function eliminarEscenaRepository(escenaId) {
  await MODELO_ESCENA.build(EntityRepository).delete(
    { escenaId }
  );
}
