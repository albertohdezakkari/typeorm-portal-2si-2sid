import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_SESION, MODELO_GIMNASIO } from '../../models/gimnasio-sesion.model.mjs';

export async function crearSesionRepository(sesion) {
  await MODELO_SESION.build(EntityRepository).put(
    sesion,
    { condition: { attr: 'sesionId', exists: false } }
  );
}

export async function listarSesionesRepository() {
  const { Items = [] } = await MODELO_SESION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
