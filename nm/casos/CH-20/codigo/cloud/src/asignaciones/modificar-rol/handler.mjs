import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  const conductorId = Number(event.pathParameters.conductorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(trayectoId, conductorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
