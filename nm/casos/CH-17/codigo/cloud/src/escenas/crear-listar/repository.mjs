import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESCENA, MODELO_ESTUDIO } from '../../models/estudio-escena.model.mjs';

export async function crearEscenaRepository(escena) {
  await MODELO_ESCENA.build(EntityRepository).put(
    escena,
    { condition: { attr: 'escenaId', exists: false } }
  );
}

export async function listarEscenasRepository() {
  const { Items = [] } = await MODELO_ESCENA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
