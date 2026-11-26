import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMBARCACION } from '../../models/puerto-embarcacion.model.mjs';
import { MODELO_TRIPULANTE, MODELO_ASIGNACION } from '../../models/tripulante-asignacion.model.mjs';

export async function buscarEmbarcacionRepository(embarcacionId) {
  const { Item } = await MODELO_EMBARCACION.build(EntityRepository).get(
    { embarcacionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarTripulanteRepository(tripulanteId) {
  const { Item } = await MODELO_TRIPULANTE.build(EntityRepository).get(
    { tripulanteId },
    { consistent: true }
  );
  return Item;
}

export async function asignarTripulanteRepository(embarcacionId, tripulanteId, rol) {
  const asignacion = { embarcacionId, tripulanteId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'embarcacionId', exists: false } }
  );
  return asignacion;
}
