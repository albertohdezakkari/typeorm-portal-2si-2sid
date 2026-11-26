import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECTO, MODELO_EMPRESA } from '../../models/empresa-proyecto.model.mjs';

export async function modificarHorasEstimadasRepository(proyectoId, horasEstimadas) {
  const { Attributes } = await MODELO_PROYECTO.build(EntityRepository).update(
    { proyectoId, horasEstimadas },
    {
      condition: { attr: 'proyectoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
