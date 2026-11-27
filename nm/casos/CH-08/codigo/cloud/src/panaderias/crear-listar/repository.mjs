import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PANADERIA } from '../../models/panaderia-producto.model.mjs';

export async function crearPanaderiaRepository(panaderia) {
  await MODELO_PANADERIA.build(EntityRepository).put(
    panaderia,
    { condition: { attr: 'panaderiaId', exists: false } }
  );
}

export async function listarPanaderiasRepository() {
  const { Items = [] } = await MODELO_PANADERIA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}