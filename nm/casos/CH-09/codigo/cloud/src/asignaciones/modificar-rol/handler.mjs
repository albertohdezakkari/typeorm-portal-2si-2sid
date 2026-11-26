import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  const mecanicoId = Number(event.pathParameters.mecanicoId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(reparacionId, mecanicoId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
