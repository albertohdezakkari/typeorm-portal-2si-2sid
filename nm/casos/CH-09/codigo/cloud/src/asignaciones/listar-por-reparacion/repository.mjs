import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/mecanico-asignacion.model.mjs';

export async function listarAsignacionesPorReparacionRepository(reparacionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: reparacionId },
    { consistent: true }
  );
  return Items;
}
