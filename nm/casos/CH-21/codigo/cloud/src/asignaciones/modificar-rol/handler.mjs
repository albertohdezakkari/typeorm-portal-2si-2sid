import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  const analistaId = Number(event.pathParameters.analistaId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(muestraId, analistaId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
