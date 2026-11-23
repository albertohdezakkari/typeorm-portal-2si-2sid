import { QueryCommand } from 'dynamodb-toolbox/table/actions/query';
import { TABLA_ASIGNACIONES, MODELO_ASIGNACION } from '../../models/profesional-asignacion.model.mjs';

export async function listarAsignacionesPorObraRepository(obraId) {
  const { Items = [] } = await TABLA_ASIGNACIONES.build(QueryCommand)
    .entities(MODELO_ASIGNACION)
    .query({ partition: obraId })
    .options({ consistent: true })
    .send();
  return Items;
}
