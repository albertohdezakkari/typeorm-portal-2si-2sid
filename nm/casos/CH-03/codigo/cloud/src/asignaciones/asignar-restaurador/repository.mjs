import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PIEZA } from '../../models/museo-pieza.model.mjs';
import { MODELO_RESTAURADOR, MODELO_ASIGNACION } from '../../models/restaurador-asignacion.model.mjs';

export async function buscarPiezaRepository(piezaId) {
  const { Item } = await MODELO_PIEZA.build(EntityRepository).get(
    { piezaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarRestauradorRepository(restauradorId) {
  const { Item } = await MODELO_RESTAURADOR.build(EntityRepository).get(
    { restauradorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarRestauradorRepository(piezaId, restauradorId, rol) {
  const asignacion = { piezaId, restauradorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'piezaId', exists: false } }
  );
  return asignacion;
}
