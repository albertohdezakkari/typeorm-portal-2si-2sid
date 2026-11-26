import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/mecanico-asignacion.model.mjs';

export async function listarAsignacionesPorMecanicoRepository(mecanicoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorMecanico', partition: mecanicoId }
  );
  return Items;
}
