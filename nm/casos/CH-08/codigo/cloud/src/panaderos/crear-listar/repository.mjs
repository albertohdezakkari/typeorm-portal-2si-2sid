import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PANADERO } from '../../models/panadero-asignacion.model.mjs';

export async function crearPanaderoRepository(panadero) {
  await MODELO_PANADERO.build(EntityRepository).put(
    panadero,
    { condition: { attr: 'panaderoId', exists: false } }
  );
}

export async function listarPanaderosRepository() {
  const { Items = [] } = await MODELO_PANADERO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
