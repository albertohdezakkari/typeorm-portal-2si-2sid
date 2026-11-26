import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROGRAMA, MODELO_EMISORA } from '../../models/emisora-programa.model.mjs';

export async function buscarEmisoraRepository(emisoraId) {
  const { Item } = await MODELO_EMISORA.build(EntityRepository).get(
    { emisoraId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarEmisoraRepository(emisoraId, minimo) {
  const { Items = [] } = await MODELO_PROGRAMA.build(EntityRepository).query(
    { index: 'PorEmisora', partition: emisoraId },
    { filters: { Programa: { attr: 'duracionMinutos', gte: minimo } } }
  );
  return Items;
}
