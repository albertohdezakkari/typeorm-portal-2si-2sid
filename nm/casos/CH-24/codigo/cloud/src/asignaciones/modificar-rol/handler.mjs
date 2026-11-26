import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  const entrenadorId = Number(event.pathParameters.entrenadorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(pistaId, entrenadorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
