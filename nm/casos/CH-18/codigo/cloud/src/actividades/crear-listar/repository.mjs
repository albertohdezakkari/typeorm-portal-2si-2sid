import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ACTIVIDAD, MODELO_CLUB } from '../../models/club-actividad.model.mjs';

export async function crearActividadRepository(actividad) {
  await MODELO_ACTIVIDAD.build(EntityRepository).put(
    actividad,
    { condition: { attr: 'actividadId', exists: false } }
  );
}

export async function listarActividadesRepository() {
  const { Items = [] } = await MODELO_ACTIVIDAD.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
