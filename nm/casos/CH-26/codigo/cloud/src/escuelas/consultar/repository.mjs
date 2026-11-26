import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AULA, MODELO_ESCUELA } from '../../models/escuela-aula.model.mjs';

export async function buscarEscuelaRepository(escuelaId) {
  const { Item } = await MODELO_ESCUELA.build(EntityRepository).get(
    { escuelaId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarEscuelaRepository(escuelaId, minimo) {
  const { Items = [] } = await MODELO_AULA.build(EntityRepository).query(
    { index: 'PorEscuela', partition: escuelaId },
    { filters: { Aula: { attr: 'capacidad', gte: minimo } } }
  );
  return Items;
}
