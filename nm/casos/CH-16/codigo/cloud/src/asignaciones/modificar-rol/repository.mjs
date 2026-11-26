import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/vendedor-asignacion.model.mjs';

export async function modificarRolRepository(articuloId, vendedorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { articuloId, vendedorId, rol },
    {
      condition: { attr: 'articuloId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
