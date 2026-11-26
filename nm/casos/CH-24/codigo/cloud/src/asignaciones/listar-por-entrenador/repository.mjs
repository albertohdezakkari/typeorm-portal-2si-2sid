import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/entrenador-asignacion.model.mjs';

export async function listarAsignacionesPorEntrenadorRepository(entrenadorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorEntrenador', partition: entrenadorId }
  );
  return Items;
}
