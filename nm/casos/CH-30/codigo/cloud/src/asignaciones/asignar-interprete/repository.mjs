import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_FUNCION } from '../../models/teatro-funcion.model.mjs';
import { MODELO_INTERPRETE, MODELO_ASIGNACION } from '../../models/interprete-asignacion.model.mjs';

export async function buscarFuncionRepository(funcionId) {
  const { Item } = await MODELO_FUNCION.build(EntityRepository).get(
    { funcionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarInterpreteRepository(interpreteId) {
  const { Item } = await MODELO_INTERPRETE.build(EntityRepository).get(
    { interpreteId },
    { consistent: true }
  );
  return Item;
}

export async function asignarInterpreteRepository(funcionId, interpreteId, rol) {
  const asignacion = { funcionId, interpreteId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'funcionId', exists: false } }
  );
  return asignacion;
}
