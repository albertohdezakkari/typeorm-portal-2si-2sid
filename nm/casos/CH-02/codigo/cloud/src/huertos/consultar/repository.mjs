import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PARCELA, MODELO_HUERTO } from '../../models/huerto-parcela.model.mjs';

export async function buscarHuertoRepository(huertoId) {
  const { Item } = await MODELO_HUERTO.build(EntityRepository).get(
    { huertoId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarHuertoRepository(huertoId, minimo) {
  const { Items = [] } = await MODELO_PARCELA.build(EntityRepository).query(
    { index: 'PorHuerto', partition: huertoId },
    { filters: { Parcela: { attr: 'superficieM2', gte: minimo } } }
  );
  return Items;
}
