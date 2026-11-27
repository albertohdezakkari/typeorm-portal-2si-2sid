import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESTACION } from '../../models/estacion-trayecto.model.mjs';

export async function crearEstacionRepository(estacion) {
  await MODELO_ESTACION.build(EntityRepository).put(
    estacion,
    { condition: { attr: 'estacionId', exists: false } }
  );
}

export async function listarEstacionesRepository() {
  const { Items = [] } = await MODELO_ESTACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}