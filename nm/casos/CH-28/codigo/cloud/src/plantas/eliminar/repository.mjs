import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLANTA, MODELO_VIVERO } from '../../models/vivero-planta.model.mjs';

export async function eliminarPlantaRepository(plantaId) {
  await MODELO_PLANTA.build(EntityRepository).delete(
    { plantaId }
  );
}
