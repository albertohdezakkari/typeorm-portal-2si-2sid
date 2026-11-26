import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MUESTRA, MODELO_LABORATORIO } from '../../models/laboratorio-muestra.model.mjs';

export async function buscarLaboratorioRepository(laboratorioId) {
  const { Item } = await MODELO_LABORATORIO.build(EntityRepository).get(
    { laboratorioId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarLaboratorioRepository(laboratorioId, minimo) {
  const { Items = [] } = await MODELO_MUESTRA.build(EntityRepository).query(
    { index: 'PorLaboratorio', partition: laboratorioId },
    { filters: { Muestra: { attr: 'cantidadMl', gte: minimo } } }
  );
  return Items;
}
