import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROFESIONAL } from '../../models/profesional-asignacion.model.mjs';

export async function crearProfesionalRepository(profesional) {
  await MODELO_PROFESIONAL.build(EntityRepository).put(
    profesional,
    { condition: { attr: 'profesionalId', exists: false } }
  );
}

export async function listarProfesionalesRepository() {
  const { Items = [] } = await MODELO_PROFESIONAL.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
