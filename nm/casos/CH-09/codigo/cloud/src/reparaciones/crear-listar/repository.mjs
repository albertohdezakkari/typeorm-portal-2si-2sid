import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_REPARACION, MODELO_TALLER } from '../../models/taller-reparacion.model.mjs';

export async function crearReparacionRepository(reparacion) {
  await MODELO_REPARACION.build(EntityRepository).put(
    reparacion,
    { condition: { attr: 'reparacionId', exists: false } }
  );
}

export async function listarReparacionesRepository() {
  const { Items = [] } = await MODELO_REPARACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
