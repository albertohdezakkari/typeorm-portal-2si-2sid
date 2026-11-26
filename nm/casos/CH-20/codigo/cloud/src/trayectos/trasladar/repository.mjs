import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TRAYECTO, MODELO_ESTACION } from '../../models/estacion-trayecto.model.mjs';

export async function trasladarTrayectoRepository(trayectoId, estacionId) {
  const { Attributes } = await MODELO_TRAYECTO.build(EntityRepository).update(
    { trayectoId, estacionId },
    {
      condition: { attr: 'trayectoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
