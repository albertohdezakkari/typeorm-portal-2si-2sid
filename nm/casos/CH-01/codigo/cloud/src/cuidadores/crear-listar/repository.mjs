import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_CUIDADOR } from '../../models/cuidador-asignacion.model.mjs';

export async function crearCuidadorRepository(cuidador) {
  await MODELO_CUIDADOR.build(EntityRepository).put(
    cuidador,
    { condition: { attr: 'cuidadorId', exists: false } }
  );
}

export async function listarCuidadoresRepository() {
  const { Items = [] } = await MODELO_CUIDADOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
