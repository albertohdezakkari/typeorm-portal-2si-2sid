import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTIVIDAD } from '../../models/club-actividad.model.mjs';
import { MODELO_MONITOR, MODELO_ASIGNACION } from '../../models/monitor-asignacion.model.mjs';

export async function buscarActividadRepository(actividadId) {
  const { Item } = await MODELO_ACTIVIDAD.build(EntityRepository).get(
    { actividadId },
    { consistent: true }
  );
  return Item;
}

export async function buscarMonitorRepository(monitorId) {
  const { Item } = await MODELO_MONITOR.build(EntityRepository).get(
    { monitorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarMonitorRepository(actividadId, monitorId, rol) {
  const asignacion = { actividadId, monitorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'actividadId', exists: false } }
  );
  return asignacion;
}
