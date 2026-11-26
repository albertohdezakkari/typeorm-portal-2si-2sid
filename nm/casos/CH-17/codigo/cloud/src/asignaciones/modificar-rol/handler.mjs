import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  const actorId = Number(event.pathParameters.actorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(escenaId, actorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
