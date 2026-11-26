import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  const artistaId = Number(event.pathParameters.artistaId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(actuacionId, artistaId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
