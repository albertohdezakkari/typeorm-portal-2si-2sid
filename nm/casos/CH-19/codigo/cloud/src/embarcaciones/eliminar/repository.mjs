import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMBARCACION, MODELO_PUERTO } from '../../models/puerto-embarcacion.model.mjs';

export async function eliminarEmbarcacionRepository(embarcacionId) {
  await MODELO_EMBARCACION.build(EntityRepository).delete(
    { embarcacionId }
  );
}
