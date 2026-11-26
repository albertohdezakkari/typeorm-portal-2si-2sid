import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tripulante-asignacion.model.mjs';

export async function listarAsignacionesPorEmbarcacionRepository(embarcacionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: embarcacionId },
    { consistent: true }
  );
  return Items;
}
