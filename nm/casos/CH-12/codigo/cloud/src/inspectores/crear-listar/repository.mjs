import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_INSPECTOR } from '../../models/inspector-asignacion.model.mjs';

export async function crearInspectorRepository(inspector) {
  await MODELO_INSPECTOR.build(EntityRepository).put(
    inspector,
    { condition: { attr: 'inspectorId', exists: false } }
  );
}

export async function listarInspectoresRepository() {
  const { Items = [] } = await MODELO_INSPECTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
