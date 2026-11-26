import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/analista-asignacion.model.mjs';

export async function listarAsignacionesPorAnalistaRepository(analistaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorAnalista', partition: analistaId }
  );
  return Items;
}
