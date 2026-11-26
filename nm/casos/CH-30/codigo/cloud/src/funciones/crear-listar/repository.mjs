import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_FUNCION, MODELO_TEATRO } from '../../models/teatro-funcion.model.mjs';

export async function crearFuncionRepository(funcion) {
  await MODELO_FUNCION.build(EntityRepository).put(
    funcion,
    { condition: { attr: 'funcionId', exists: false } }
  );
}

export async function listarFuncionesRepository() {
  const { Items = [] } = await MODELO_FUNCION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
