import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AULA, MODELO_ESCUELA } from '../../models/escuela-aula.model.mjs';

export async function crearAulaRepository(aula) {
  await MODELO_AULA.build(EntityRepository).put(
    aula,
    { condition: { attr: 'aulaId', exists: false } }
  );
}

export async function listarAulasRepository() {
  const { Items = [] } = await MODELO_AULA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
