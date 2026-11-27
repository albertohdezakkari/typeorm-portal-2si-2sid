import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_GIMNASIO } from '../../models/gimnasio-sesion.model.mjs';

export async function crearGimnasioRepository(gimnasio) {
  await MODELO_GIMNASIO.build(EntityRepository).put(
    gimnasio,
    { condition: { attr: 'gimnasioId', exists: false } }
  );
}

export async function listarGimnasiosRepository() {
  const { Items = [] } = await MODELO_GIMNASIO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}