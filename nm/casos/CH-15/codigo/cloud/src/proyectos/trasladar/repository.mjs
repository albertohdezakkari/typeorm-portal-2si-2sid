import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECTO, MODELO_EMPRESA } from '../../models/empresa-proyecto.model.mjs';

export async function trasladarProyectoRepository(proyectoId, empresaId) {
  const { Attributes } = await MODELO_PROYECTO.build(EntityRepository).update(
    { proyectoId, empresaId },
    {
      condition: { attr: 'proyectoId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
