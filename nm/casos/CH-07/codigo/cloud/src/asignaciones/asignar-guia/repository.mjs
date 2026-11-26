import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EXCURSION } from '../../models/agencia-excursion.model.mjs';
import { MODELO_GUIA, MODELO_ASIGNACION } from '../../models/guia-asignacion.model.mjs';

export async function buscarExcursionRepository(excursionId) {
  const { Item } = await MODELO_EXCURSION.build(EntityRepository).get(
    { excursionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarGuiaRepository(guiaId) {
  const { Item } = await MODELO_GUIA.build(EntityRepository).get(
    { guiaId },
    { consistent: true }
  );
  return Item;
}

export async function asignarGuiaRepository(excursionId, guiaId, rol) {
  const asignacion = { excursionId, guiaId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'excursionId', exists: false } }
  );
  return asignacion;
}
