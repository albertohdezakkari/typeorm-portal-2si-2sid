import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MUESTRA, MODELO_LABORATORIO } from '../../models/laboratorio-muestra.model.mjs';

export async function eliminarMuestraRepository(muestraId) {
  await MODELO_MUESTRA.build(EntityRepository).delete(
    { muestraId }
  );
}
