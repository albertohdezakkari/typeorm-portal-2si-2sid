import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARTICULO, MODELO_TIENDA } from '../../models/tienda-articulo.model.mjs';

export async function trasladarArticuloRepository(articuloId, tiendaId) {
  const { Attributes } = await MODELO_ARTICULO.build(EntityRepository).update(
    { articuloId, tiendaId },
    {
      condition: { attr: 'articuloId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
