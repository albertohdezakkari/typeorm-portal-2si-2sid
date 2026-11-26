import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MUESTRA, MODELO_LABORATORIO } from '../../models/laboratorio-muestra.model.mjs';

export async function trasladarMuestraRepository(muestraId, laboratorioId) {
  const { Attributes } = await MODELO_MUESTRA.build(EntityRepository).update(
    { muestraId, laboratorioId },
    {
      condition: { attr: 'muestraId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
