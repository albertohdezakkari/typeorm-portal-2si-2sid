import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/autor-asignacion.model.mjs';

export async function listarAsignacionesPorAutorRepository(autorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorAutor', partition: autorId }
  );
  return Items;
}
