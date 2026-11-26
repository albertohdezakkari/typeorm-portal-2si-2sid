import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const plantaId = Number(event.pathParameters.plantaId);
  const jardineroId = Number(event.pathParameters.jardineroId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(plantaId, jardineroId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
