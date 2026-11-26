import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ENTRENADOR } from '../../models/entrenador-asignacion.model.mjs';

export async function crearEntrenadorRepository(entrenador) {
  await MODELO_ENTRENADOR.build(EntityRepository).put(
    entrenador,
    { condition: { attr: 'entrenadorId', exists: false } }
  );
}

export async function listarEntrenadoresRepository() {
  const { Items = [] } = await MODELO_ENTRENADOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
