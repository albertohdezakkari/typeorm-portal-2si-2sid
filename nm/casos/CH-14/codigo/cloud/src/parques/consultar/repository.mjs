import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ZONA, MODELO_PARQUE } from '../../models/parque-zona.model.mjs';

export async function buscarParqueRepository(parqueId) {
  const { Item } = await MODELO_PARQUE.build(EntityRepository).get(
    { parqueId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarParqueRepository(parqueId, minimo) {
  const { Items = [] } = await MODELO_ZONA.build(EntityRepository).query(
    { index: 'PorParque', partition: parqueId },
    { filters: { Zona: { attr: 'capacidad', gte: minimo } } }
  );
  return Items;
}
