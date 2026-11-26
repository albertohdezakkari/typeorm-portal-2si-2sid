import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LOTE } from '../../models/cooperativa-lote.model.mjs';
import { MODELO_INSPECTOR, MODELO_ASIGNACION } from '../../models/inspector-asignacion.model.mjs';

export async function buscarLoteRepository(loteId) {
  const { Item } = await MODELO_LOTE.build(EntityRepository).get(
    { loteId },
    { consistent: true }
  );
  return Item;
}

export async function buscarInspectorRepository(inspectorId) {
  const { Item } = await MODELO_INSPECTOR.build(EntityRepository).get(
    { inspectorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarInspectorRepository(loteId, inspectorId, rol) {
  const asignacion = { loteId, inspectorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'loteId', exists: false } }
  );
  return asignacion;
}
