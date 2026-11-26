import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_JARDINERO } from '../../models/jardinero-asignacion.model.mjs';

export async function crearJardineroRepository(jardinero) {
  await MODELO_JARDINERO.build(EntityRepository).put(
    jardinero,
    { condition: { attr: 'jardineroId', exists: false } }
  );
}

export async function listarJardinerosRepository() {
  const { Items = [] } = await MODELO_JARDINERO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
