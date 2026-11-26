import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AGRICULTOR } from '../../models/agricultor-asignacion.model.mjs';

export async function crearAgricultorRepository(agricultor) {
  await MODELO_AGRICULTOR.build(EntityRepository).put(
    agricultor,
    { condition: { attr: 'agricultorId', exists: false } }
  );
}

export async function listarAgricultoresRepository() {
  const { Items = [] } = await MODELO_AGRICULTOR.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
