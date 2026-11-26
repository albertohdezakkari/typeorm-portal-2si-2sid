import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/inspector-asignacion.model.mjs';

export async function listarAsignacionesPorInspectorRepository(inspectorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorInspector', partition: inspectorId }
  );
  return Items;
}
