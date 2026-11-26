import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REPARACION, MODELO_TALLER } from '../../models/taller-reparacion.model.mjs';

export async function buscarTallerRepository(tallerId) {
  const { Item } = await MODELO_TALLER.build(EntityRepository).get(
    { tallerId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarTallerRepository(tallerId, minimo) {
  const { Items = [] } = await MODELO_REPARACION.build(EntityRepository).query(
    { index: 'PorTaller', partition: tallerId },
    { filters: { Reparacion: { attr: 'costeCentimos', gte: minimo } } }
  );
  return Items;
}
