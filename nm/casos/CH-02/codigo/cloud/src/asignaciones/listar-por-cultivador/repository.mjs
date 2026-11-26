import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cultivador-asignacion.model.mjs';

export async function listarAsignacionesPorCultivadorRepository(cultivadorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorCultivador', partition: cultivadorId }
  );
  return Items;
}
