import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function modificarRolRepository(plazaId, tecnicoId, rol) {
  const { Attributes } = await MODELO_ASIGNACION.build(EntityRepository).update(
    { plazaId, tecnicoId, rol },
    {
      condition: { attr: 'plazaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
