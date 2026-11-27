import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REFUGIO } from '../../models/refugio-animal.model.mjs';

export async function crearRefugioRepository(refugio) {
  await MODELO_REFUGIO.build(EntityRepository).put(
    refugio,
    { condition: { attr: 'refugioId', exists: false } }
  );
}

export async function listarRefugiosRepository() {
  const { Items = [] } = await MODELO_REFUGIO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}