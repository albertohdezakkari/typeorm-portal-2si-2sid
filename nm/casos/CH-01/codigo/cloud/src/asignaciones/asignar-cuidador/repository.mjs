import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ANIMAL } from '../../models/refugio-animal.model.mjs';
import { MODELO_CUIDADOR, MODELO_ASIGNACION } from '../../models/cuidador-asignacion.model.mjs';

export async function buscarAnimalRepository(animalId) {
  const { Item } = await MODELO_ANIMAL.build(EntityRepository).get(
    { animalId },
    { consistent: true }
  );
  return Item;
}

export async function buscarCuidadorRepository(cuidadorId) {
  const { Item } = await MODELO_CUIDADOR.build(EntityRepository).get(
    { cuidadorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarCuidadorRepository(animalId, cuidadorId, rol) {
  const asignacion = { animalId, cuidadorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'animalId', exists: false } }
  );
  return asignacion;
}
