import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/monitor-asignacion.model.mjs';

export async function listarAsignacionesPorMonitorRepository(monitorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorMonitor', partition: monitorId }
  );
  return Items;
}
