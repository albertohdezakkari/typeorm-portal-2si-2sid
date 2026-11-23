import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const profesionalId = Number(event.pathParameters.profesionalId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(obraId, profesionalId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
