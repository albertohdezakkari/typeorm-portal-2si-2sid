import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AYUNTAMIENTO } from '../../models/ayuntamiento-obra.model.mjs';

export async function crearAyuntamientoRepository(ayuntamiento) {
  await MODELO_AYUNTAMIENTO.build(EntityRepository).put(
    ayuntamiento,
    { condition: { attr: 'ayuntamientoId', exists: false } }
  );
}

export async function listarAyuntamientosRepository() {
  const { Items = [] } = await MODELO_AYUNTAMIENTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}