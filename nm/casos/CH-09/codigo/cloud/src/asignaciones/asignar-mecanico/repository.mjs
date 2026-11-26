import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REPARACION } from '../../models/taller-reparacion.model.mjs';
import { MODELO_MECANICO, MODELO_ASIGNACION } from '../../models/mecanico-asignacion.model.mjs';

export async function buscarReparacionRepository(reparacionId) {
  const { Item } = await MODELO_REPARACION.build(EntityRepository).get(
    { reparacionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarMecanicoRepository(mecanicoId) {
  const { Item } = await MODELO_MECANICO.build(EntityRepository).get(
    { mecanicoId },
    { consistent: true }
  );
  return Item;
}

export async function asignarMecanicoRepository(reparacionId, mecanicoId, rol) {
  const asignacion = { reparacionId, mecanicoId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'reparacionId', exists: false } }
  );
  return asignacion;
}
