import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/vendedor-asignacion.model.mjs';

export async function listarAsignacionesPorVendedorRepository(vendedorId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorVendedor', partition: vendedorId }
  );
  return Items;
}
