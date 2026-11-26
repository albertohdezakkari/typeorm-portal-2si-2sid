import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PISTA, MODELO_COMPLEJO } from '../../models/complejo-pista.model.mjs';

export async function crearPistaRepository(pista) {
  await MODELO_PISTA.build(EntityRepository).put(
    pista,
    { condition: { attr: 'pistaId', exists: false } }
  );
}

export async function listarPistasRepository() {
  const { Items = [] } = await MODELO_PISTA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
