import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/autor-asignacion.model.mjs';

export async function listarAsignacionesPorPublicacionRepository(publicacionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: publicacionId },
    { consistent: true }
  );
  return Items;
}
