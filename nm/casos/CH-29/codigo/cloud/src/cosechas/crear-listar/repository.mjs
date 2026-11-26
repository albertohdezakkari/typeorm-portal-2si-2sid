import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COSECHA, MODELO_GRANJA } from '../../models/granja-cosecha.model.mjs';

export async function crearCosechaRepository(cosecha) {
  await MODELO_COSECHA.build(EntityRepository).put(
    cosecha,
    { condition: { attr: 'cosechaId', exists: false } }
  );
}

export async function listarCosechasRepository() {
  const { Items = [] } = await MODELO_COSECHA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
