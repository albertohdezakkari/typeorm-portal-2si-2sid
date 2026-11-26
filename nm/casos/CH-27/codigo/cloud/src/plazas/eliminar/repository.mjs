import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLAZA, MODELO_URBANIZACION } from '../../models/urbanizacion-plaza.model.mjs';

export async function eliminarPlazaRepository(plazaId) {
  await MODELO_PLAZA.build(EntityRepository).delete(
    { plazaId }
  );
}
