import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TRAYECTO } from '../../models/estacion-trayecto.model.mjs';
import { MODELO_CONDUCTOR, MODELO_ASIGNACION } from '../../models/conductor-asignacion.model.mjs';

export async function buscarTrayectoRepository(trayectoId) {
  const { Item } = await MODELO_TRAYECTO.build(EntityRepository).get(
    { trayectoId },
    { consistent: true }
  );
  return Item;
}

export async function buscarConductorRepository(conductorId) {
  const { Item } = await MODELO_CONDUCTOR.build(EntityRepository).get(
    { conductorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarConductorRepository(trayectoId, conductorId, rol) {
  const asignacion = { trayectoId, conductorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'trayectoId', exists: false } }
  );
  return asignacion;
}
