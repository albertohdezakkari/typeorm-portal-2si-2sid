import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  const restauradorId = Number(event.pathParameters.restauradorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(piezaId, restauradorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
