import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  const huespedId = Number(event.pathParameters.huespedId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(reservaId, huespedId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
