import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cocinero-asignacion.model.mjs';

export async function listarAsignacionesPorCocineroRepository(cocineroId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorCocinero', partition: cocineroId }
  );
  return Items;
}
