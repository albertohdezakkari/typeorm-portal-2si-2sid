import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/enfermero-asignacion.model.mjs';

export async function listarAsignacionesPorEnfermeroRepository(enfermeroId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorEnfermero', partition: enfermeroId }
  );
  return Items;
}
