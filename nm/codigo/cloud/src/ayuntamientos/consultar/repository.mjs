import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO } from '../../models/ayuntamiento-obra.model.mjs';

export async function buscarAyuntamientoRepository(ayuntamientoId) {
  const { Item } = await MODELO_AYUNTAMIENTO.build(EntityRepository).get(
    { ayuntamientoId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarAyuntamientoRepository(ayuntamientoId, minimo) {
  const { Items = [] } = await MODELO_OBRA.build(EntityRepository).query(
    { index: 'PorAyuntamiento', partition: ayuntamientoId },
    { filters: { Obra: { attr: 'presupuestoEuros', gte: minimo } } }
  );
  return Items;
}
