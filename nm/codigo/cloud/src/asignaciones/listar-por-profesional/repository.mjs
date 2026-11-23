import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function listarAsignacionesPorProfesionalRepository(profesionalId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorProfesional', partition: profesionalId }
  );
  return Items;
}
