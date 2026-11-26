import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ENFERMERO } from '../../models/enfermero-asignacion.model.mjs';

export async function crearEnfermeroRepository(enfermero) {
  await MODELO_ENFERMERO.build(EntityRepository).put(
    enfermero,
    { condition: { attr: 'enfermeroId', exists: false } }
  );
}

export async function listarEnfermerosRepository() {
  const { Items = [] } = await MODELO_ENFERMERO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
