import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/artista-asignacion.model.mjs';

export async function listarAsignacionesPorActuacionRepository(actuacionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: actuacionId },
    { consistent: true }
  );
  return Items;
}
