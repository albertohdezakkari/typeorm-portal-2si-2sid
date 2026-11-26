import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/analista-asignacion.model.mjs';

export async function listarAsignacionesPorMuestraRepository(muestraId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: muestraId },
    { consistent: true }
  );
  return Items;
}
