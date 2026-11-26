import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMBARCACION, MODELO_PUERTO } from '../../models/puerto-embarcacion.model.mjs';

export async function buscarPuertoRepository(puertoId) {
  const { Item } = await MODELO_PUERTO.build(EntityRepository).get(
    { puertoId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarPuertoRepository(puertoId, minimo) {
  const { Items = [] } = await MODELO_EMBARCACION.build(EntityRepository).query(
    { index: 'PorPuerto', partition: puertoId },
    { filters: { Embarcacion: { attr: 'esloraMetros', gte: minimo } } }
  );
  return Items;
}
