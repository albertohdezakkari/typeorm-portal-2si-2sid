import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COMPLEJO } from '../../models/complejo-pista.model.mjs';

export async function crearComplejoRepository(complejo) {
  await MODELO_COMPLEJO.build(EntityRepository).put(
    complejo,
    { condition: { attr: 'complejoId', exists: false } }
  );
}

export async function listarComplejosRepository() {
  const { Items = [] } = await MODELO_COMPLEJO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}