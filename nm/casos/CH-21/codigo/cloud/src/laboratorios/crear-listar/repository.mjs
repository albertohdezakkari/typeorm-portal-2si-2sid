import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LABORATORIO } from '../../models/laboratorio-muestra.model.mjs';

export async function crearLaboratorioRepository(laboratorio) {
  await MODELO_LABORATORIO.build(EntityRepository).put(
    laboratorio,
    { condition: { attr: 'laboratorioId', exists: false } }
  );
}

export async function listarLaboratoriosRepository() {
  const { Items = [] } = await MODELO_LABORATORIO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}