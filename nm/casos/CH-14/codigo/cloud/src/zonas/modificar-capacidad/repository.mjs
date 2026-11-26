import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ZONA, MODELO_PARQUE } from '../../models/parque-zona.model.mjs';

export async function modificarCapacidadRepository(zonaId, capacidad) {
  const { Attributes } = await MODELO_ZONA.build(EntityRepository).update(
    { zonaId, capacidad },
    {
      condition: { attr: 'zonaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
