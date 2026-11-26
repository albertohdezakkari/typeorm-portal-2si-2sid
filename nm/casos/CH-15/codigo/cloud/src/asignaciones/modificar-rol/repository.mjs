import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/colaborador-asignacion.model.mjs';

export async function modificarRolRepository(proyectoId, colaboradorId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { proyectoId, colaboradorId, rol },
    {
      condition: { attr: 'proyectoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
