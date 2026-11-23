import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_OBRA } from '../../models/ayuntamiento-obra.model.mjs';
import { MODELO_PROFESIONAL, MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function buscarObraRepository(obraId) {
  const { Item } = await MODELO_OBRA.build(EntityRepository).get(
    { obraId },
    { consistent: true }
  );
  return Item;
}

export async function buscarProfesionalRepository(profesionalId) {
  const { Item } = await MODELO_PROFESIONAL.build(EntityRepository).get(
    { profesionalId },
    { consistent: true }
  );
  return Item;
}

export async function asignarProfesionalRepository(obraId, profesionalId, rol) {
  const asignacion = { obraId, profesionalId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'obraId', exists: false } }
  );
  return asignacion;
}
