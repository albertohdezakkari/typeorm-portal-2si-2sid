import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  const revisorId = Number(event.pathParameters.revisorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(documentoId, revisorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
