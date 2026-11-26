import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PROYECTO } from '../../models/empresa-proyecto.model.mjs';
import { MODELO_COLABORADOR, MODELO_ASIGNACION } from '../../models/colaborador-asignacion.model.mjs';

export async function buscarProyectoRepository(proyectoId) {
  const { Item } = await MODELO_PROYECTO.build(EntityRepository).get(
    { proyectoId },
    { consistent: true }
  );
  return Item;
}

export async function buscarColaboradorRepository(colaboradorId) {
  const { Item } = await MODELO_COLABORADOR.build(EntityRepository).get(
    { colaboradorId },
    { consistent: true }
  );
  return Item;
}

export async function asignarColaboradorRepository(proyectoId, colaboradorId, rol) {
  const asignacion = { proyectoId, colaboradorId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'proyectoId', exists: false } }
  );
  return asignacion;
}
