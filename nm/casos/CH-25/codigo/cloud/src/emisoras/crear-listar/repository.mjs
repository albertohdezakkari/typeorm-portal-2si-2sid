import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMISORA } from '../../models/emisora-programa.model.mjs';

export async function crearEmisoraRepository(emisora) {
  await MODELO_EMISORA.build(EntityRepository).put(
    emisora,
    { condition: { attr: 'emisoraId', exists: false } }
  );
}

export async function listarEmisorasRepository() {
  const { Items = [] } = await MODELO_EMISORA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}