import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_RESERVA, MODELO_HOTEL } from '../../models/hotel-reserva.model.mjs';

export async function modificarNochesRepository(reservaId, noches) {
  const { Attributes } = await MODELO_RESERVA.build(EntityRepository).update(
    { reservaId, noches },
    {
      condition: { attr: 'reservaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
