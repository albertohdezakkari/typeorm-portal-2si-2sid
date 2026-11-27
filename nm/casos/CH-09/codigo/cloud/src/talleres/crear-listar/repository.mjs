import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_TALLER } from '../../models/taller-reparacion.model.mjs';

export async function crearTallerRepository(taller) {
  await MODELO_TALLER.build(EntityRepository).put(
    taller,
    { condition: { attr: 'tallerId', exists: false } }
  );
}

export async function listarTalleresRepository() {
  const { Items = [] } = await MODELO_TALLER.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}