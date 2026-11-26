import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  const instructorId = Number(event.pathParameters.instructorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(sesionId, instructorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
