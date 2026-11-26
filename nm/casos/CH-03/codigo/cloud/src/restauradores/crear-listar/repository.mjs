import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_RESTAURADOR } from '../../models/restaurador-asignacion.model.mjs';

export async function crearRestauradorRepository(restaurador) {
  await MODELO_RESTAURADOR.build(EntityRepository).put(
    restaurador,
    { condition: { attr: 'restauradorId', exists: false } }
  );
}

export async function listarRestauradoresRepository() {
  const { Items = [] } = await MODELO_RESTAURADOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
