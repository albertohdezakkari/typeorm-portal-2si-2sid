import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  const interpreteId = Number(event.pathParameters.interpreteId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(funcionId, interpreteId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
