import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/vendedor-asignacion.model.mjs';

export async function listarAsignacionesPorArticuloRepository(articuloId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: articuloId },
    { consistent: true }
  );
  return Items;
}
