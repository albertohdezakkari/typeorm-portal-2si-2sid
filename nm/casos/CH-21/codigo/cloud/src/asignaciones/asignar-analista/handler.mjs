import { asignarAnalistaService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  const { analistaId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarAnalistaService(muestraId, analistaId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El analista ya está asignado a esa muestra' }) };
    }
    throw error;
  }
}
