import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_EMPRESA } from '../../models/empresa-proyecto.model.mjs';

export async function crearEmpresaRepository(empresa) {
  await MODELO_EMPRESA.build(EntityRepository).put(
    empresa,
    { condition: { attr: 'empresaId', exists: false } }
  );
}

export async function listarEmpresasRepository() {
  const { Items = [] } = await MODELO_EMPRESA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}