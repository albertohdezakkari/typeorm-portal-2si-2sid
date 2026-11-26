import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/agricultor-asignacion.model.mjs';

export async function listarAsignacionesPorAgricultorRepository(agricultorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorAgricultor', partition: agricultorId }
  );
  return Items;
}
