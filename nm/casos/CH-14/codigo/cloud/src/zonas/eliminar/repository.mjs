import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ZONA, MODELO_PARQUE } from '../../models/parque-zona.model.mjs';

export async function eliminarZonaRepository(zonaId) {
  await MODELO_ZONA.build(EntityRepository).delete(
    { zonaId }
  );
}
