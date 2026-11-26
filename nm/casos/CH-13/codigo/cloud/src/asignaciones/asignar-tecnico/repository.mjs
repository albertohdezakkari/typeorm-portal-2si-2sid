import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECCION } from '../../models/cine-proyeccion.model.mjs';
import { MODELO_TECNICO, MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function buscarProyeccionRepository(proyeccionId) {
  const { Item } = await MODELO_PROYECCION.build(EntityRepository).get(
    { proyeccionId },
    { consistent: true }
  );
  return Item;
}

export async function buscarTecnicoRepository(tecnicoId) {
  const { Item } = await MODELO_TECNICO.build(EntityRepository).get(
    { tecnicoId },
    { consistent: true }
  );
  return Item;
}

export async function asignarTecnicoRepository(proyeccionId, tecnicoId, rol) {
  const asignacion = { proyeccionId, tecnicoId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'proyeccionId', exists: false } }
  );
  return asignacion;
}
