import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COSECHA } from '../../models/granja-cosecha.model.mjs';
import { MODELO_AGRICULTOR, MODELO_ASIGNACION } from '../../models/agricultor-asignacion.model.mjs';

export async function buscarCosechaRepository(cosechaId) {
  const { Item } = await MODELO_COSECHA.build(EntityRepository).get(
    { cosechaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarAgricultorRepository(agricultorId) {
  const { Item } = await MODELO_AGRICULTOR.build(EntityRepository).get(
    { agricultorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarAgricultorRepository(cosechaId, agricultorId, rol) {
  const asignacion = { cosechaId, agricultorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'cosechaId', exists: false } }
  );
  return asignacion;
}
