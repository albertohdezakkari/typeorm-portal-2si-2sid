import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ZONA } from '../../models/parque-zona.model.mjs';
import { MODELO_JARDINERO, MODELO_ASIGNACION } from '../../models/jardinero-asignacion.model.mjs';

export async function buscarZonaRepository(zonaId) {
  const { Item } = await MODELO_ZONA.build(EntityRepository).get(
    { zonaId },
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

export async function asignarJardineroRepository(zonaId, jardineroId, rol) {
  const asignacion = { zonaId, jardineroId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'zonaId', exists: false } }
  );
  return asignacion;
}
