import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTUACION } from '../../models/festival-actuacion.model.mjs';
import { MODELO_ARTISTA, MODELO_ASIGNACION } from '../../models/artista-asignacion.model.mjs';

export async function buscarActuacionRepository(actuacionId) {
  const { Item } = await MODELO_ACTUACION.build(EntityRepository).get(
    { actuacionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarArtistaRepository(artistaId) {
  const { Item } = await MODELO_ARTISTA.build(EntityRepository).get(
    { artistaId },
    { consistent: true }
  );
  return Item;
}

export async function asignarArtistaRepository(actuacionId, artistaId, rol) {
  const asignacion = { actuacionId, artistaId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'actuacionId', exists: false } }
  );
  return asignacion;
}
