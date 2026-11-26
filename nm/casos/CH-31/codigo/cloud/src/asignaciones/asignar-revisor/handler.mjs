import { asignarRevisorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  const { revisorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarRevisorService(documentoId, revisorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El revisor ya está asignado a ese documento' }) };
    }
    throw error;
  }
}
