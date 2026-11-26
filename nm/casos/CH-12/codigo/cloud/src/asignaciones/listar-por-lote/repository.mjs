import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/inspector-asignacion.model.mjs';

export async function listarAsignacionesPorLoteRepository(loteId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: loteId },
    { consistent: true }
  );
  return Items;
}
