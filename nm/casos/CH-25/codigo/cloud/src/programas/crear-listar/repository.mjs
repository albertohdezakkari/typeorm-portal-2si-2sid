import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROGRAMA, MODELO_EMISORA } from '../../models/emisora-programa.model.mjs';

export async function crearProgramaRepository(programa) {
  await MODELO_PROGRAMA.build(EntityRepository).put(
    programa,
    { condition: { attr: 'programaId', exists: false } }
  );
}

export async function listarProgramasRepository() {
  const { Items = [] } = await MODELO_PROGRAMA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
