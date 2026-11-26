import { asignarInspectorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const loteId = Number(event.pathParameters.loteId);
  const { inspectorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarInspectorService(loteId, inspectorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El inspector ya está asignado a ese lote' }) };
    }
    throw error;
  }
}
