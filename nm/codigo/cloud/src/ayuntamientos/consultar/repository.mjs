import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { QueryCommand } from 'dynamodb-toolbox/table/actions/query';
import { MODELO_OBRA, MODELO_AYUNTAMIENTO, TABLA_OBRAS } from '../../models/ayuntamiento-obra.model.mjs';

export async function buscarAyuntamientoRepository(ayuntamientoId) {
  const { Item } = await MODELO_AYUNTAMIENTO.build(GetItemCommand)
    .key({ ayuntamientoId }).options({ consistent: true }).send();
  return Item ?? null;
}

export async function consultarAyuntamientoRepository(ayuntamientoId, minimo) {
  const { Items = [] } = await TABLA_OBRAS.build(QueryCommand)
    .entities(MODELO_OBRA)
    .query({ index: 'PorAyuntamiento', partition: ayuntamientoId })
    .options({ filters: { Obra: { attr: 'presupuestoEuros', gte: minimo } } })
    .send();
  return Items;
}
