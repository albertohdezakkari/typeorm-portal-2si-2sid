import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/revisor-asignacion.model.mjs';

export async function modificarRolRepository(documentoId, revisorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { documentoId, revisorId, rol },
    {
      condition: { attr: 'documentoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
