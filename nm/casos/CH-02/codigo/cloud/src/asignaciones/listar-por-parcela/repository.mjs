import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/cultivador-asignacion.model.mjs';

export async function listarAsignacionesPorParcelaRepository(parcelaId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: parcelaId },
    { consistent: true }
  );
  return Items;
}
