import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTUACION, MODELO_FESTIVAL } from '../../models/festival-actuacion.model.mjs';

export async function crearActuacionRepository(actuacion) {
  await MODELO_ACTUACION.build(EntityRepository).put(
    actuacion,
    { condition: { attr: 'actuacionId', exists: false } }
  );
}

export async function listarActuacionesRepository() {
  const { Items = [] } = await MODELO_ACTUACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
