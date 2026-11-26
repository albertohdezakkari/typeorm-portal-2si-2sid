import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_LOCUTOR } from '../../models/locutor-asignacion.model.mjs';

export async function crearLocutorRepository(locutor) {
  await MODELO_LOCUTOR.build(EntityRepository).put(
    locutor,
    { condition: { attr: 'locutorId', exists: false } }
  );
}

export async function listarLocutoresRepository() {
  const { Items = [] } = await MODELO_LOCUTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
