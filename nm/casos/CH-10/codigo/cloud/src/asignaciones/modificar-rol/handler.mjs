import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  const enfermeroId = Number(event.pathParameters.enfermeroId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(habitacionId, enfermeroId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
