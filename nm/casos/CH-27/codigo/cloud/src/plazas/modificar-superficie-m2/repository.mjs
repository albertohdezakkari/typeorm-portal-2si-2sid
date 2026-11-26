import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLAZA, MODELO_URBANIZACION } from '../../models/urbanizacion-plaza.model.mjs';

export async function modificarSuperficieM2Repository(plazaId, superficieM2) {
  const { Attributes } = await MODELO_PLAZA.build(EntityRepository).update(
    { plazaId, superficieM2 },
    {
      condition: { attr: 'plazaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
