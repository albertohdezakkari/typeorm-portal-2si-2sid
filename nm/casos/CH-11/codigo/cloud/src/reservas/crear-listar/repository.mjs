import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_RESERVA, MODELO_HOTEL } from '../../models/hotel-reserva.model.mjs';

export async function crearReservaRepository(reserva) {
  await MODELO_RESERVA.build(EntityRepository).put(
    reserva,
    { condition: { attr: 'reservaId', exists: false } }
  );
}

export async function listarReservasRepository() {
  const { Items = [] } = await MODELO_RESERVA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
