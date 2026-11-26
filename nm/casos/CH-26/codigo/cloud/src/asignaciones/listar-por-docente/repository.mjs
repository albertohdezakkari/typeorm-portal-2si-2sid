import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/docente-asignacion.model.mjs';

export async function listarAsignacionesPorDocenteRepository(docenteId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { index: 'PorDocente', partition: docenteId }
  );
  return Items;
}
