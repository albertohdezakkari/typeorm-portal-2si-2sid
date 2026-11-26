import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/panadero-asignacion.model.mjs';

export async function modificarRolRepository(productoId, panaderoId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { productoId, panaderoId, rol },
    {
      condition: { attr: 'productoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
