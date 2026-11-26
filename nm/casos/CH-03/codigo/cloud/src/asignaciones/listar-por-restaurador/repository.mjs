import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/restaurador-asignacion.model.mjs';

export async function listarAsignacionesPorRestauradorRepository(restauradorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorRestaurador', partition: restauradorId }
  );
  return Items;
}
