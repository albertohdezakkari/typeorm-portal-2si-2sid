import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_CULTIVADOR } from '../../models/cultivador-asignacion.model.mjs';

export async function crearCultivadorRepository(cultivador) {
  await MODELO_CULTIVADOR.build(EntityRepository).put(
    cultivador,
    { condition: { attr: 'cultivadorId', exists: false } }
  );
}

export async function listarCultivadoresRepository() {
  const { Items = [] } = await MODELO_CULTIVADOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
