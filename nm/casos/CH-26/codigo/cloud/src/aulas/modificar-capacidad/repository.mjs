import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AULA, MODELO_ESCUELA } from '../../models/escuela-aula.model.mjs';

export async function modificarCapacidadRepository(aulaId, capacidad) {
  const { Attributes } = await MODELO_AULA.build(EntityRepository).update(
    { aulaId, capacidad },
    {
      condition: { attr: 'aulaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
