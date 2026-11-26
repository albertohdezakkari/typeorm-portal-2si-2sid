import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_RESERVA } from '../../models/hotel-reserva.model.mjs';
import { MODELO_HUESPED, MODELO_ASIGNACION } from '../../models/huesped-asignacion.model.mjs';

export async function buscarReservaRepository(reservaId) {
  const { Item } = await MODELO_RESERVA.build(EntityRepository).get(
    { reservaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarHuespedRepository(huespedId) {
  const { Item } = await MODELO_HUESPED.build(EntityRepository).get(
    { huespedId },
    { consistent: true }
  );
  return Item;
}

export async function asignarHuespedRepository(reservaId, huespedId, rol) {
  const asignacion = { reservaId, huespedId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'reservaId', exists: false } }
  );
  return asignacion;
}
