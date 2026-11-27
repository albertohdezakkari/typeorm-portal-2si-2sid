import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESCUELA } from '../../models/escuela-aula.model.mjs';

export async function crearEscuelaRepository(escuela) {
  await MODELO_ESCUELA.build(EntityRepository).put(
    escuela,
    { condition: { attr: 'escuelaId', exists: false } }
  );
}

export async function listarEscuelasRepository() {
  const { Items = [] } = await MODELO_ESCUELA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}