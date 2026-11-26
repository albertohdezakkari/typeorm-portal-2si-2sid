import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_MUESTRA } from '../../models/laboratorio-muestra.model.mjs';
import { MODELO_ANALISTA, MODELO_ASIGNACION } from '../../models/analista-asignacion.model.mjs';

export async function buscarMuestraRepository(muestraId) {
  const { Item } = await MODELO_MUESTRA.build(EntityRepository).get(
    { muestraId },
    { consistent: true }
  );
  return Item;
}

export async function buscarAnalistaRepository(analistaId) {
  const { Item } = await MODELO_ANALISTA.build(EntityRepository).get(
    { analistaId },
    { consistent: true }
  );
  return Item;
}

export async function asignarAnalistaRepository(muestraId, analistaId, rol) {
  const asignacion = { muestraId, analistaId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'muestraId', exists: false } }
  );
  return asignacion;
}
