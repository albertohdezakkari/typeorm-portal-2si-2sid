import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/panadero-asignacion.model.mjs';

export async function listarAsignacionesPorProductoRepository(productoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: productoId },
    { consistent: true }
  );
  return Items;
}
