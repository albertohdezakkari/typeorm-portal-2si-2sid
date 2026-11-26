import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_FUNCION, MODELO_TEATRO } from '../../models/teatro-funcion.model.mjs';

export async function eliminarFuncionRepository(funcionId) {
  await MODELO_FUNCION.build(EntityRepository).delete(
    { funcionId }
  );
}
