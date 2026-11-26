import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/conductor-asignacion.model.mjs';

export async function listarAsignacionesPorTrayectoRepository(trayectoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: trayectoId },
    { consistent: true }
  );
  return Items;
}
