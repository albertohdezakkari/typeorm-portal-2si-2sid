import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/interprete-asignacion.model.mjs';

export async function listarAsignacionesPorInterpreteRepository(interpreteId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorInterprete', partition: interpreteId }
  );
  return Items;
}
