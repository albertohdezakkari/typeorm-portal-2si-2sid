import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/locutor-asignacion.model.mjs';

export async function listarAsignacionesPorLocutorRepository(locutorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorLocutor', partition: locutorId }
  );
  return Items;
}
