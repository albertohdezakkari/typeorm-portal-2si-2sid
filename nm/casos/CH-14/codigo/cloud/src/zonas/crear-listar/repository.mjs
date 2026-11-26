import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ZONA, MODELO_PARQUE } from '../../models/parque-zona.model.mjs';

export async function crearZonaRepository(zona) {
  await MODELO_ZONA.build(EntityRepository).put(
    zona,
    { condition: { attr: 'zonaId', exists: false } }
  );
}

export async function listarZonasRepository() {
  const { Items = [] } = await MODELO_ZONA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
