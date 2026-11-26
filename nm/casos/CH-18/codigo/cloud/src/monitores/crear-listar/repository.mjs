import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MONITOR } from '../../models/monitor-asignacion.model.mjs';

export async function crearMonitorRepository(monitor) {
  await MODELO_MONITOR.build(EntityRepository).put(
    monitor,
    { condition: { attr: 'monitorId', exists: false } }
  );
}

export async function listarMonitoresRepository() {
  const { Items = [] } = await MODELO_MONITOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
