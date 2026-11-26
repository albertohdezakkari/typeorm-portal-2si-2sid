import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_DOCENTE } from '../../models/docente-asignacion.model.mjs';

export async function crearDocenteRepository(docente) {
  await MODELO_DOCENTE.build(EntityRepository).put(
    docente,
    { condition: { attr: 'docenteId', exists: false } }
  );
}

export async function listarDocentesRepository() {
  const { Items = [] } = await MODELO_DOCENTE.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
