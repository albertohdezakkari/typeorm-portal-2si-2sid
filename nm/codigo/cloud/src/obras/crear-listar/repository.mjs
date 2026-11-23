import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO } from '../../models/ayuntamiento-obra.model.mjs';

export async function crearObraRepository(obra) {
  await MODELO_OBRA.build(EntityRepository).put(
    obra,
    { condition: { attr: 'obraId', exists: false } }
  );
}

export async function listarObrasRepository() {
  const { Items = [] } = await MODELO_OBRA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
