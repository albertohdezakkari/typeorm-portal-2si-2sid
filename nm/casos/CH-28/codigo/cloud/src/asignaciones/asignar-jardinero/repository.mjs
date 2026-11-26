import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLANTA } from '../../models/vivero-planta.model.mjs';
import { MODELO_JARDINERO, MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function buscarPlantaRepository(plantaId) {
  const { Item } = await MODELO_PLANTA.build(EntityRepository).get(
    { plantaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarJardineroRepository(jardineroId) {
  const { Item } = await MODELO_JARDINERO.build(EntityRepository).get(
    { jardineroId },
    { consistent: true }
  );
  return Item;
}

export async function asignarJardineroRepository(plantaId, jardineroId, rol) {
  const asignacion = { plantaId, jardineroId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'plantaId', exists: false } }
  );
  return asignacion;
}
