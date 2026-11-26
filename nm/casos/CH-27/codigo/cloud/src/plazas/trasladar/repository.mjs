import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLAZA, MODELO_URBANIZACION } from '../../models/urbanizacion-plaza.model.mjs';

export async function trasladarPlazaRepository(plazaId, urbanizacionId) {
  const { Attributes } = await MODELO_PLAZA.build(EntityRepository).update(
    { plazaId, urbanizacionId },
    {
      condition: { attr: 'plazaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
