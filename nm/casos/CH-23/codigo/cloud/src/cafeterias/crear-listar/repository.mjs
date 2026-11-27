import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_CAFETERIA } from '../../models/cafeteria-comanda.model.mjs';

export async function crearCafeteriaRepository(cafeteria) {
  await MODELO_CAFETERIA.build(EntityRepository).put(
    cafeteria,
    { condition: { attr: 'cafeteriaId', exists: false } }
  );
}

export async function listarCafeteriasRepository() {
  const { Items = [] } = await MODELO_CAFETERIA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}