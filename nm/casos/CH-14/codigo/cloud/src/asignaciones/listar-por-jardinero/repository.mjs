import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function listarAsignacionesPorJardineroRepository(jardineroId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorJardinero', partition: jardineroId }
  );
  return Items;
}
