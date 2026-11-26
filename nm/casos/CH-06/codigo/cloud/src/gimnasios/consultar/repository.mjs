import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_SESION, MODELO_GIMNASIO } from '../../models/gimnasio-sesion.model.mjs';

export async function buscarGimnasioRepository(gimnasioId) {
  const { Item } = await MODELO_GIMNASIO.build(EntityRepository).get(
    { gimnasioId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarGimnasioRepository(gimnasioId, minimo) {
  const { Items = [] } = await MODELO_SESION.build(EntityRepository).query(
    { index: 'PorGimnasio', partition: gimnasioId },
    { filters: { Sesion: { attr: 'plazas', gte: minimo } } }
  );
  return Items;
}
