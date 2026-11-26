import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TRIPULANTE } from '../../models/tripulante-asignacion.model.mjs';

export async function crearTripulanteRepository(tripulante) {
  await MODELO_TRIPULANTE.build(EntityRepository).put(
    tripulante,
    { condition: { attr: 'tripulanteId', exists: false } }
  );
}

export async function listarTripulantesRepository() {
  const { Items = [] } = await MODELO_TRIPULANTE.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
