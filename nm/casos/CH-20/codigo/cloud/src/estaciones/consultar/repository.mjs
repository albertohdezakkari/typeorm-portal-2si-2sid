import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TRAYECTO, MODELO_ESTACION } from '../../models/estacion-trayecto.model.mjs';

export async function buscarEstacionRepository(estacionId) {
  const { Item } = await MODELO_ESTACION.build(EntityRepository).get(
    { estacionId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarEstacionRepository(estacionId, minimo) {
  const { Items = [] } = await MODELO_TRAYECTO.build(EntityRepository).query(
    { index: 'PorEstacion', partition: estacionId },
    { filters: { Trayecto: { attr: 'distanciaKm', gte: minimo } } }
  );
  return Items;
}
