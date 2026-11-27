import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HUERTO } from '../../models/huerto-parcela.model.mjs';

export async function crearHuertoRepository(huerto) {
  await MODELO_HUERTO.build(EntityRepository).put(
    huerto,
    { condition: { attr: 'huertoId', exists: false } }
  );
}

export async function listarHuertosRepository() {
  const { Items = [] } = await MODELO_HUERTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}