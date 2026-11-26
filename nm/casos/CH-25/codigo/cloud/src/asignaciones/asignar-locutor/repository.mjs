import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROGRAMA } from '../../models/emisora-programa.model.mjs';
import { MODELO_LOCUTOR, MODELO_ASIGNACION } from '../../models/locutor-asignacion.model.mjs';

export async function buscarProgramaRepository(programaId) {
  const { Item } = await MODELO_PROGRAMA.build(EntityRepository).get(
    { programaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarLocutorRepository(locutorId) {
  const { Item } = await MODELO_LOCUTOR.build(EntityRepository).get(
    { locutorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarLocutorRepository(programaId, locutorId, rol) {
  const asignacion = { programaId, locutorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'programaId', exists: false } }
  );
  return asignacion;
}
