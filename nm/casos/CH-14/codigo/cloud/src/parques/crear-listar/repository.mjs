import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PARQUE } from '../../models/parque-zona.model.mjs';

export async function crearParqueRepository(parque) {
  await MODELO_PARQUE.build(EntityRepository).put(
    parque,
    { condition: { attr: 'parqueId', exists: false } }
  );
}

export async function listarParquesRepository() {
  const { Items = [] } = await MODELO_PARQUE.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}