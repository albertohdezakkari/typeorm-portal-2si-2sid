import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/colaborador-asignacion.model.mjs';

export async function listarAsignacionesPorProyectoRepository(proyectoId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: proyectoId },
    { consistent: true }
  );
  return Items;
}
