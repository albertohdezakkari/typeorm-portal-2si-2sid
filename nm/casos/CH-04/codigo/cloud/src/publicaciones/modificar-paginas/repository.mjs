import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PUBLICACION, MODELO_EDITORIAL } from '../../models/editorial-publicacion.model.mjs';

export async function modificarPaginasRepository(publicacionId, paginas) {
  const { Attributes } = await MODELO_PUBLICACION.build(EntityRepository).update(
    { publicacionId, paginas },
    {
      condition: { attr: 'publicacionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
