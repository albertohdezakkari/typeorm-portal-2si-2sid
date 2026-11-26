import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ANIMAL, MODELO_REFUGIO } from '../../models/refugio-animal.model.mjs';

export async function buscarRefugioRepository(refugioId) {
  const { Item } = await MODELO_REFUGIO.build(EntityRepository).get(
    { refugioId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarRefugioRepository(refugioId, minimo) {
  const { Items = [] } = await MODELO_ANIMAL.build(EntityRepository).query(
    { index: 'PorRefugio', partition: refugioId },
    { filters: { Animal: { attr: 'edadMeses', gte: minimo } } }
  );
  return Items;
}
