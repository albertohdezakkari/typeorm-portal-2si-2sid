import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_SESION, MODELO_GIMNASIO } from '../../models/gimnasio-sesion.model.mjs';

export async function trasladarSesionRepository(sesionId, gimnasioId) {
  const { Attributes } = await MODELO_SESION.build(EntityRepository).update(
    { sesionId, gimnasioId },
    {
      condition: { attr: 'sesionId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
