import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ASIGNACION } from '../../models/tecnico-asignacion.model.mjs';

export async function listarAsignacionesPorProyeccionRepository(proyeccionId) {
  const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
    { partition: proyeccionId },
    { consistent: true }
  );
  return Items;
}
