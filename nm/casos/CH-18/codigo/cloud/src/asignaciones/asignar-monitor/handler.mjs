import { asignarMonitorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const actividadId = Number(event.pathParameters.actividadId);
  const { monitorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarMonitorService(actividadId, monitorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El monitor ya está asignado a esa actividad' }) };
    }
    throw error;
  }
}
