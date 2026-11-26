import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_RESERVA, MODELO_HOTEL } from '../../models/hotel-reserva.model.mjs';

export async function eliminarReservaRepository(reservaId) {
  await MODELO_RESERVA.build(EntityRepository).delete(
    { reservaId }
  );
}
