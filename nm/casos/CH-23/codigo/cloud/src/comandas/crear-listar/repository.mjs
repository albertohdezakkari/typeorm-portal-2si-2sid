import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COMANDA, MODELO_CAFETERIA } from '../../models/cafeteria-comanda.model.mjs';

export async function crearComandaRepository(comanda) {
  await MODELO_COMANDA.build(EntityRepository).put(
    comanda,
    { condition: { attr: 'comandaId', exists: false } }
  );
}

export async function listarComandasRepository() {
  const { Items = [] } = await MODELO_COMANDA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
