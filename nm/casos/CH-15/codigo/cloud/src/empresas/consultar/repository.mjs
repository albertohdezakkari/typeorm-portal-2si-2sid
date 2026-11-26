import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECTO, MODELO_EMPRESA } from '../../models/empresa-proyecto.model.mjs';

export async function buscarEmpresaRepository(empresaId) {
  const { Item } = await MODELO_EMPRESA.build(EntityRepository).get(
    { empresaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarEmpresaRepository(empresaId, minimo) {
  const { Items = [] } = await MODELO_PROYECTO.build(EntityRepository).query(
    { index: 'PorEmpresa', partition: empresaId },
    { filters: { Proyecto: { attr: 'horasEstimadas', gte: minimo } } }
  );
  return Items;
}
