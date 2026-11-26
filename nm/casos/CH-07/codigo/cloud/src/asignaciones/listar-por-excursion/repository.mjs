import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/guia-asignacion.model.mjs';

export async function listarAsignacionesPorExcursionRepository(excursionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: excursionId },
    { consistent: true }
  );
  return Items;
}
