import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MUESTRA, MODELO_LABORATORIO } from '../../models/laboratorio-muestra.model.mjs';

export async function crearMuestraRepository(muestra) {
  await MODELO_MUESTRA.build(EntityRepository).put(
    muestra,
    { condition: { attr: 'muestraId', exists: false } }
  );
}

export async function listarMuestrasRepository() {
  const { Items = [] } = await MODELO_MUESTRA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
