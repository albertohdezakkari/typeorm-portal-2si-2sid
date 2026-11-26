import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/restaurador-asignacion.model.mjs';

export async function listarAsignacionesPorPiezaRepository(piezaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: piezaId },
    { consistent: true }
  );
  return Items;
}
