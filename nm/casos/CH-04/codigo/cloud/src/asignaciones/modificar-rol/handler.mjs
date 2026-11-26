import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  const autorId = Number(event.pathParameters.autorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(publicacionId, autorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
