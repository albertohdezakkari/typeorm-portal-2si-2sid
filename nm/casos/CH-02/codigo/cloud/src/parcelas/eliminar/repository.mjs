import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PARCELA, MODELO_HUERTO } from '../../models/huerto-parcela.model.mjs';

export async function eliminarParcelaRepository(parcelaId) {
  await MODELO_PARCELA.build(EntityRepository).delete(
    { parcelaId }
  );
}
