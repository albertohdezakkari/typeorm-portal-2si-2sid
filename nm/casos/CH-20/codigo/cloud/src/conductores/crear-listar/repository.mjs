import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_CONDUCTOR } from '../../models/conductor-asignacion.model.mjs';

export async function crearConductorRepository(conductor) {
  await MODELO_CONDUCTOR.build(EntityRepository).put(
    conductor,
    { condition: { attr: 'conductorId', exists: false } }
  );
}

export async function listarConductoresRepository() {
  const { Items = [] } = await MODELO_CONDUCTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
