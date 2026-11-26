import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROGRAMA, MODELO_EMISORA } from '../../models/emisora-programa.model.mjs';

export async function eliminarProgramaRepository(programaId) {
  await MODELO_PROGRAMA.build(EntityRepository).delete(
    { programaId }
  );
}
