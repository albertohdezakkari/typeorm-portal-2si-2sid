import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PIEZA, MODELO_MUSEO } from '../../models/museo-pieza.model.mjs';

export async function eliminarPiezaRepository(piezaId) {
  await MODELO_PIEZA.build(EntityRepository).delete(
    { piezaId }
  );
}
