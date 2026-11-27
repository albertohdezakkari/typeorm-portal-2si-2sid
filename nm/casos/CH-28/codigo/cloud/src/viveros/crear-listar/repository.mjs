import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_VIVERO } from '../../models/vivero-planta.model.mjs';

export async function crearViveroRepository(vivero) {
  await MODELO_VIVERO.build(EntityRepository).put(
    vivero,
    { condition: { attr: 'viveroId', exists: false } }
  );
}

export async function listarViverosRepository() {
  const { Items = [] } = await MODELO_VIVERO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}