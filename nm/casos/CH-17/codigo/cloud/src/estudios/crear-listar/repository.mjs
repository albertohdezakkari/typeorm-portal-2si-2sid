import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESTUDIO } from '../../models/estudio-escena.model.mjs';

export async function crearEstudioRepository(estudio) {
  await MODELO_ESTUDIO.build(EntityRepository).put(
    estudio,
    { condition: { attr: 'estudioId', exists: false } }
  );
}

export async function listarEstudiosRepository() {
  const { Items = [] } = await MODELO_ESTUDIO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}