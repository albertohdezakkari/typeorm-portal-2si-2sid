import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PISTA } from '../../models/complejo-pista.model.mjs';
import { MODELO_ENTRENADOR, MODELO_ASIGNACION } from '../../models/entrenador-asignacion.model.mjs';

export async function buscarPistaRepository(pistaId) {
  const { Item } = await MODELO_PISTA.build(EntityRepository).get(
    { pistaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarEntrenadorRepository(entrenadorId) {
  const { Item } = await MODELO_ENTRENADOR.build(EntityRepository).get(
    { entrenadorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarEntrenadorRepository(pistaId, entrenadorId, rol) {
  const asignacion = { pistaId, entrenadorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'pistaId', exists: false } }
  );
  return asignacion;
}
