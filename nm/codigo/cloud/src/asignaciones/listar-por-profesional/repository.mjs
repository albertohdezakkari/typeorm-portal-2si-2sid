import { QueryCommand } from 'dynamodb-toolbox/table/actions/query';
import { TABLA_ASIGNACIONES, MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function listarAsignacionesPorProfesionalRepository(profesionalId) {
  const { Items = [] } = await TABLA_ASIGNACIONES.build(QueryCommand)
    .entities(MODELO_ASIGNACION)
    .query({ index: 'PorProfesional', partition: profesionalId })
    .send();
  return Items;
}
