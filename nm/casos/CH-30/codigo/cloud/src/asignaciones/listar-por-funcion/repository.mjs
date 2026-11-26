import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/interprete-asignacion.model.mjs';

export async function listarAsignacionesPorFuncionRepository(funcionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: funcionId },
    { consistent: true }
  );
  return Items;
}
