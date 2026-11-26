import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PARCELA, MODELO_HUERTO } from '../../models/huerto-parcela.model.mjs';

export async function crearParcelaRepository(parcela) {
  await MODELO_PARCELA.build(EntityRepository).put(
    parcela,
    { condition: { attr: 'parcelaId', exists: false } }
  );
}

export async function listarParcelasRepository() {
  const { Items = [] } = await MODELO_PARCELA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
