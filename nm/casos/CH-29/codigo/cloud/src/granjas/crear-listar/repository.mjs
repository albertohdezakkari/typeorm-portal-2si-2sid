import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_GRANJA } from '../../models/granja-cosecha.model.mjs';

export async function crearGranjaRepository(granja) {
  await MODELO_GRANJA.build(EntityRepository).put(
    granja,
    { condition: { attr: 'granjaId', exists: false } }
  );
}

export async function listarGranjasRepository() {
  const { Items = [] } = await MODELO_GRANJA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}