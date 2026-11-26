import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECCION, MODELO_CINE } from '../../models/cine-proyeccion.model.mjs';

export async function crearProyeccionRepository(proyeccion) {
  await MODELO_PROYECCION.build(EntityRepository).put(
    proyeccion,
    { condition: { attr: 'proyeccionId', exists: false } }
  );
}

export async function listarProyeccionesRepository() {
  const { Items = [] } = await MODELO_PROYECCION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
