import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/actor-asignacion.model.mjs';

export async function listarAsignacionesPorEscenaRepository(escenaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: escenaId },
    { consistent: true }
  );
  return Items;
}
