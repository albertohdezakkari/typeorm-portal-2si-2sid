import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const programaId = Number(event.pathParameters.programaId);
  const locutorId = Number(event.pathParameters.locutorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(programaId, locutorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
