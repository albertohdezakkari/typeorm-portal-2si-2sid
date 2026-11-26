import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/docente-asignacion.model.mjs';

export async function modificarRolRepository(aulaId, docenteId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { aulaId, docenteId, rol },
    {
      condition: { attr: 'aulaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
