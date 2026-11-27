import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PUERTO } from '../../models/puerto-embarcacion.model.mjs';

export async function crearPuertoRepository(puerto) {
  await MODELO_PUERTO.build(EntityRepository).put(
    puerto,
    { condition: { attr: 'puertoId', exists: false } }
  );
}

export async function listarPuertosRepository() {
  const { Items = [] } = await MODELO_PUERTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}