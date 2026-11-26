import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/docente-asignacion.model.mjs';

export async function listarAsignacionesPorAulaRepository(aulaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: aulaId },
    { consistent: true }
  );
  return Items;
}
