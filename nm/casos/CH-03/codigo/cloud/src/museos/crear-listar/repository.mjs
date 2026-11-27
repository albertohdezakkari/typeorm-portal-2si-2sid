import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MUSEO } from '../../models/museo-pieza.model.mjs';

export async function crearMuseoRepository(museo) {
  await MODELO_MUSEO.build(EntityRepository).put(
    museo,
    { condition: { attr: 'museoId', exists: false } }
  );
}

export async function listarMuseosRepository() {
  const { Items = [] } = await MODELO_MUSEO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}