import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_DOCUMENTO } from '../../models/archivo-documento.model.mjs';
import { MODELO_REVISOR, MODELO_ASIGNACION } from '../../models/revisor-asignacion.model.mjs';

export async function buscarDocumentoRepository(documentoId) {
  const { Item } = await MODELO_DOCUMENTO.build(EntityRepository).get(
    { documentoId },
    { consistent: true }
  );
  return Item;
}

export async function buscarRevisorRepository(revisorId) {
  const { Item } = await MODELO_REVISOR.build(EntityRepository).get(
    { revisorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarRevisorRepository(documentoId, revisorId, rol) {
  const asignacion = { documentoId, revisorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'documentoId', exists: false } }
  );
  return asignacion;
}
