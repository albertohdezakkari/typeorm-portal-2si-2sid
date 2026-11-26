import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PIEZA, MODELO_MUSEO } from '../../models/museo-pieza.model.mjs';

export async function crearPiezaRepository(pieza) {
  await MODELO_PIEZA.build(EntityRepository).put(
    pieza,
    { condition: { attr: 'piezaId', exists: false } }
  );
}

export async function listarPiezasRepository() {
  const { Items = [] } = await MODELO_PIEZA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
