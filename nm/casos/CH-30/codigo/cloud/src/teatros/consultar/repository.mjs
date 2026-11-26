import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_FUNCION, MODELO_TEATRO } from '../../models/teatro-funcion.model.mjs';

export async function buscarTeatroRepository(teatroId) {
  const { Item } = await MODELO_TEATRO.build(EntityRepository).get(
    { teatroId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarTeatroRepository(teatroId, minimo) {
  const { Items = [] } = await MODELO_FUNCION.build(EntityRepository).query(
    { index: 'PorTeatro', partition: teatroId },
    { filters: { Funcion: { attr: 'aforo', gte: minimo } } }
  );
  return Items;
}
