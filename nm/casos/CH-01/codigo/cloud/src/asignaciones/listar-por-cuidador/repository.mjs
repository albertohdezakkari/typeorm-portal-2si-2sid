import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cuidador-asignacion.model.mjs';

export async function listarAsignacionesPorCuidadorRepository(cuidadorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorCuidador', partition: cuidadorId }
  );
  return Items;
}
