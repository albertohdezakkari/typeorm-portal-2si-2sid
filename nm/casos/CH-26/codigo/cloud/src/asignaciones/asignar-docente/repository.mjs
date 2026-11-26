import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_AULA } from '../../models/escuela-aula.model.mjs';
import { MODELO_DOCENTE, MODELO_ASIGNACION } from '../../models/docente-asignacion.model.mjs';

export async function buscarAulaRepository(aulaId) {
  const { Item } = await MODELO_AULA.build(EntityRepository).get(
    { aulaId },
    { consistent: true }
  );
  return Item;
}

export async function buscarDocenteRepository(docenteId) {
  const { Item } = await MODELO_DOCENTE.build(EntityRepository).get(
    { docenteId },
    { consistent: true }
  );
  return Item;
}

export async function asignarDocenteRepository(aulaId, docenteId, rol) {
  const asignacion = { aulaId, docenteId, rol };
  await MODELO_ASIGNACION.build(EntityRepository).put(
    asignacion,
    { condition: { attr: 'aulaId', exists: false } }
  );
  return asignacion;
}
