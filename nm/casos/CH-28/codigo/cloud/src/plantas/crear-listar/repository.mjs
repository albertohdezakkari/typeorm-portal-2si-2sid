import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLANTA, MODELO_VIVERO } from '../../models/vivero-planta.model.mjs';

export async function crearPlantaRepository(planta) {
  await MODELO_PLANTA.build(EntityRepository).put(
    planta,
    { condition: { attr: 'plantaId', exists: false } }
  );
}

export async function listarPlantasRepository() {
  const { Items = [] } = await MODELO_PLANTA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
