import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTIVIDAD, MODELO_CLUB } from '../../models/club-actividad.model.mjs';

export async function modificarPlazasRepository(actividadId, plazas) {
  const { Attributes } = await MODELO_ACTIVIDAD.build(EntityRepository).update(
    { actividadId, plazas },
    {
      condition: { attr: 'actividadId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
