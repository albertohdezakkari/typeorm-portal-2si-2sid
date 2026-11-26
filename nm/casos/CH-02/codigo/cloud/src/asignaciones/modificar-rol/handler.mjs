import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  const cultivadorId = Number(event.pathParameters.cultivadorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(parcelaId, cultivadorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
