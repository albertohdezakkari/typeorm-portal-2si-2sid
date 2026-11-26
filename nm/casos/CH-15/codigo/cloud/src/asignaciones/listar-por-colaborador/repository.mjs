import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/colaborador-asignacion.model.mjs';

export async function listarAsignacionesPorColaboradorRepository(colaboradorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorColaborador', partition: colaboradorId }
  );
  return Items;
}
