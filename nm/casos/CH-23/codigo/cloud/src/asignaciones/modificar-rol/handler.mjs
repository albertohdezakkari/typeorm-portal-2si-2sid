import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  const cocineroId = Number(event.pathParameters.cocineroId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(comandaId, cocineroId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
