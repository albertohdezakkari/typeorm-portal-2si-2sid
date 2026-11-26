import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ESCENA, MODELO_ESTUDIO } from '../../models/estudio-escena.model.mjs';

export async function buscarEstudioRepository(estudioId) {
  const { Item } = await MODELO_ESTUDIO.build(EntityRepository).get(
    { estudioId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarEstudioRepository(estudioId, minimo) {
  const { Items = [] } = await MODELO_ESCENA.build(EntityRepository).query(
    { index: 'PorEstudio', partition: estudioId },
    { filters: { Escena: { attr: 'duracionSegundos', gte: minimo } } }
  );
  return Items;
}
