import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TRAYECTO, MODELO_ESTACION } from '../../models/estacion-trayecto.model.mjs';

export async function crearTrayectoRepository(trayecto) {
  await MODELO_TRAYECTO.build(EntityRepository).put(
    trayecto,
    { condition: { attr: 'trayectoId', exists: false } }
  );
}

export async function listarTrayectosRepository() {
  const { Items = [] } = await MODELO_TRAYECTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
